"use client";

import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
type Shape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
} | {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
} | {
  type: "pencil";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
} | {
  type: "triangle";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
};


async function getExistingShapes(roomId: string): Promise<Shape[]> {
  // drop any trailing slashes so we never generate //chats/…
  const base = HTTP_BACKEND.replace(/\/+$/, "");
  const url  = `${base}/chats/${roomId}`;

  try {
    const { data } = await axios.get<{ messages: { message: string }[] }>(url);

    return data.messages.flatMap(({ message }) => {
      try {
        const payload = JSON.parse(message);
        if (Array.isArray(payload))           return payload;          // message is [Shape]
        if (Array.isArray(payload?.shapes))   return payload.shapes;   // { shapes: [...] }
        return [payload];                                              // single Shape
      } catch {
        return [];                                                     // skip bad JSON
      }
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      console.warn(`GET ${url} → 404 (room not found)`);
      return [];                               // empty canvas instead of crash
    }
    throw e;                                // bubble up anything else
  }
}


async function sendShapeToBackend(roomId: string, shape: Shape) {
  try {
    await axios.post(`${HTTP_BACKEND}/chats/${roomId}`, {
      type: "chat",
      message: JSON.stringify(shape)
    });
  } catch (error) {
    console.error("Error sending shape:", error);
  }
}

function sendShapeToBackendAndSocket(roomId: string, shape: Shape, socket?: WebSocket) {
  // Send via HTTP
  sendShapeToBackend(roomId, shape);
  // Send via WebSocket if available
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId: roomId
      })
    );
  }
}

function drawAllObjects(p: p5, objects: Shape[]) {
  p.clear(0, 0, 0, 255); 
  p.background(0); 
  p.stroke(255); 
  p.noFill(); 

  for (const obj of objects) {
    p.push();
    if (obj.type === "rect") {
      p.rect(obj.x, obj.y, obj.width, obj.height);
    } else if (obj.type === "circle") {
      p.circle(obj.centerX, obj.centerY, obj.radius * 2);
    } else if (obj.type === "pencil") {
      p.line(obj.startX, obj.startY, obj.endX, obj.endY);
    } else if (obj.type === "triangle") {
      p.triangle(obj.x1, obj.y1, obj.x2, obj.y2, obj.x3, obj.y3);
    }
    p.pop();
  }
}

function drawShape(p: p5, shape: Shape) {
  p.push();
  p.stroke(255);
  p.noFill();
  if (shape.type === "rect") {
    p.rect(shape.x, shape.y, shape.width, shape.height);
  } else if (shape.type === "circle") {
    p.circle(shape.centerX, shape.centerY, shape.radius * 2);
  } else if (shape.type === "pencil") {
    p.line(shape.startX, shape.startY, shape.endX, shape.endY);
  } else if (shape.type === "triangle") {
    p.triangle(shape.x1, shape.y1, shape.x2, shape.y2, shape.x3, shape.y3);
  }
  p.pop();
}

interface CanvasPageProps {
  roomId: string;
  socket: WebSocket ;
}

export default function CanvasPage({ roomId,socket }: CanvasPageProps) {
  useEffect(() => {
    console.log("CanvasPage received roomId:", roomId);
    if (!roomId) {
      console.error("No roomId provided to CanvasPage");
      return;
    }
    if (typeof roomId !== "string") {
      console.error("Invalid roomId type:", typeof roomId);
      return;
    }
    if (roomId.trim() === "") {
      console.error("Empty roomId provided");
      return;
    }
  }, [roomId]);
  

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const parsedshape = JSON.parse(message.message);
      // Only add the shape if it's not already in the array
      const isDuplicate = shapesRef.current.some(shape => 
        JSON.stringify(shape) === JSON.stringify(parsedshape)
      );
      if (!isDuplicate) {
        shapesRef.current.push(parsedshape);
        if (p5InstanceRef.current) {
          drawShape(p5InstanceRef.current, parsedshape);
        }
      }
    }
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const toolRef = useRef<"pencil" | "rect" | "circle" | "triangle">("pencil");
  const shapesRef = useRef<Shape[]>([]);
  const [tool, setTool] = useState<"pencil" | "rect" | "circle" | "triangle">("pencil");
  const [shapesLoaded, setShapesLoaded] = useState(false);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  // Load existing shapes when socket connects (only once)
  useEffect(() => {
    if (!socket || shapesLoaded || !p5InstanceRef.current) return;   
    const loadShapes = async () => {
      try {
        const shapes = await getExistingShapes(roomId);
        shapesRef.current = shapes;
  
        drawAllObjects(p5InstanceRef.current!, shapesRef.current);   
        setShapesLoaded(true);
      } catch (error) {
        console.error("Error loading shapes for room:", roomId, error);
      }
    };
    loadShapes();
  }, [socket, roomId, shapesLoaded, p5InstanceRef.current]);        
  
  const handleClearCanvas = async () => {
    const p = p5InstanceRef.current;
    shapesRef.current = [];
    if (p) {
      p.clear();
      p.background(0);
    }
    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: "clear",
          roomId: roomId
        }));
      } else {
        console.error("WebSocket is not connected");
      }
    } catch (error) {
      console.error("Error clearing canvas:", error);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let selectedObjectIndex: number | null = null;
    let dragOffset = { x: 0, y: 0 };

    const sketch = (p: p5) => {
      let drawing = false;
      let prevX = 0, prevY = 0;
      let startX = 0, startY = 0;
      let isDrawingNew = false;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(containerRef.current!);
        p.background(0);
        p.stroke(255);
        p.strokeWeight(2);
        p.noFill();
      };

      // Helper function to constrain coordinates within canvas bounds
      function constrainToCanvas(x: number, y: number): { x: number, y: number } {
        return {
          x: Math.max(0, Math.min(x, p.width)),
          y: Math.max(0, Math.min(y, p.height))
        };
      }

      // Helper function to check if a point is within canvas bounds
      function isWithinCanvas(x: number, y: number): boolean {
        return x >= 0 && x <= p.width && y >= 0 && y <= p.height;
      }

      function isInsideRect(mx: number, my: number, obj: Shape) {
        if (obj.type !== "rect") return false;
        return mx >= obj.x && mx <= obj.x + obj.width && 
               my >= obj.y && my <= obj.y + obj.height;
      }

      function isInsideCircle(mx: number, my: number, obj: Shape) {
        if (obj.type !== "circle") return false;
        const dx = mx - obj.centerX;
        const dy = my - obj.centerY;
        return Math.sqrt(dx*dx + dy*dy) <= obj.radius;
      }

      function isInsideTriangle(mx: number, my: number, obj: Shape) {
        if (obj.type !== "triangle") return false;
        const {x1, y1, x2, y2, x3, y3} = obj;
        const area = 0.5 *(-y2*x3 + y1*(-x2 + x3) + x1*(y2 - y3) + x2*y3);
        const s = 1/(2*area)*(y1*x3 - x1*y3 + (y3-y1)*mx + (x1-x3)*my);
        const t = 1/(2*area)*(x1*y2 - y1*x2 + (y1-y2)*mx + (x2-x1)*my);
        const u = 1 - s - t;
        return s >= 0 && t >= 0 && u >= 0;
      }

      p.mousePressed = () => {
        // Don't start drawing if mouse is outside canvas
        if (!isWithinCanvas(p.mouseX, p.mouseY)) return;
        if (p.mouseX < 220 && p.mouseY < 60) return;
        const currentTool = toolRef.current;
        selectedObjectIndex = null;

        // Check for shape selection
        for (let i = shapesRef.current.length - 1; i >= 0; i--) {
          const obj = shapesRef.current[i];
          if (
            (obj.type === "rect" && isInsideRect(p.mouseX, p.mouseY, obj)) ||
            (obj.type === "circle" && isInsideCircle(p.mouseX, p.mouseY, obj)) ||
            (obj.type === "triangle" && isInsideTriangle(p.mouseX, p.mouseY, obj))
          ) {
            selectedObjectIndex = i;
            if (obj.type === "rect") {
              dragOffset = { x: p.mouseX - obj.x, y: p.mouseY - obj.y };
            } else if (obj.type === "circle") {
              dragOffset = { x: p.mouseX - obj.centerX, y: p.mouseY - obj.centerY };
            } else if (obj.type === "triangle") {
              dragOffset = { x: p.mouseX - obj.x1, y: p.mouseY - obj.y1 };
            }
            isDrawingNew = false;
            return;
          }
        }

        isDrawingNew = true;
        startX = p.mouseX;
        startY = p.mouseY;

        if (currentTool === "pencil") {
          drawing = true;
          prevX = p.mouseX;
          prevY = p.mouseY;
        }
      };

      p.mouseDragged = () => {
        const currentTool = toolRef.current;
        if (selectedObjectIndex !== null) {
          const obj = shapesRef.current[selectedObjectIndex];
          if (obj.type === "rect") {
            const newX = p.mouseX - dragOffset.x;
            const newY = p.mouseY - dragOffset.y;
            // Keep the shape within canvas bounds
            obj.x = Math.max(0, Math.min(newX, p.width - obj.width));
            obj.y = Math.max(0, Math.min(newY, p.height - obj.height));
          } else if (obj.type === "circle") {
            const newCenterX = p.mouseX - dragOffset.x;
            const newCenterY = p.mouseY - dragOffset.y;
            // Keep the circle within canvas bounds
            obj.centerX = Math.max(obj.radius, Math.min(newCenterX, p.width - obj.radius));
            obj.centerY = Math.max(obj.radius, Math.min(newCenterY, p.height - obj.radius));
          } else if (obj.type === "triangle") {
            const dx = p.mouseX - dragOffset.x - obj.x1;
            const dy = p.mouseY - dragOffset.y - obj.y1;
            // Calculate new positions
            const newX1 = obj.x1 + dx;
            const newY1 = obj.y1 + dy;
            const newX2 = obj.x2 + dx;
            const newY2 = obj.y2 + dy;
            const newX3 = obj.x3 + dx;
            const newY3 = obj.y3 + dy;
            
            // Check if the entire triangle would be within bounds
            if (isWithinCanvas(newX1, newY1) && 
                isWithinCanvas(newX2, newY2) && 
                isWithinCanvas(newX3, newY3)) {
              obj.x1 = newX1;
              obj.y1 = newY1;
              obj.x2 = newX2;
              obj.y2 = newY2;
              obj.x3 = newX3;
              obj.y3 = newY3;
              dragOffset = { x: p.mouseX - obj.x1, y: p.mouseY - obj.y1 };
            }
          }
          drawAllObjects(p, shapesRef.current);
          return;
        }

        if (!isDrawingNew) return;

        if (currentTool === "pencil" && drawing) {
          // Constrain the line endpoints to canvas
          const start = constrainToCanvas(prevX, prevY);
          const end = constrainToCanvas(p.mouseX, p.mouseY);
          
          // Draw the temporary line
          p.stroke(255);
          p.line(start.x, start.y, end.x, end.y);
          
          // Create and send the shape
          const newShape: Shape = {
            type: "pencil",
            startX: start.x,
            startY: start.y,
            endX: end.x,
            endY: end.y
          };
          shapesRef.current.push(newShape);
          sendShapeToBackendAndSocket(roomId, newShape, socket);
          
          // Update previous position
          prevX = end.x;
          prevY = end.y;
        } else {
          // Preview shape while dragging
          drawAllObjects(p, shapesRef.current);
          p.stroke(255);
          if (currentTool === "rect") {
            const width = Math.min(p.mouseX - startX, p.width - startX);
            const height = Math.min(p.mouseY - startY, p.height - startY);
            p.rect(startX, startY, width, height);
          } else if (currentTool === "circle") {
            const maxRadius = Math.min(
              Math.min(p.width - startX, startX),
              Math.min(p.height - startY, startY)
            );
            const radius = Math.min(
              Math.max(
                Math.abs(p.mouseX - startX),
                Math.abs(p.mouseY - startY)
              ) / 2,
              maxRadius
            );
            const centerX = startX + (p.mouseX - startX) / 2;
            const centerY = startY + (p.mouseY - startY) / 2;
            p.circle(centerX, centerY, radius * 2);
          } else if (currentTool === "triangle") {
            const x1 = startX;
            const y1 = startY;
            const x2 = Math.min(p.mouseX, p.width);
            const y2 = Math.min(p.mouseY, p.height);
            const x3 = x1 + (x2 - x1) / 2;
            const y3 = Math.max(y1 - Math.abs(x2 - x1), 0);
            p.triangle(x1, y1, x2, y2, x3, y3);
          }
        }
      };

      p.mouseReleased = () => {
        const currentTool = toolRef.current;
        if (selectedObjectIndex !== null) {
          selectedObjectIndex = null;
          return;
        }

        if (!isDrawingNew) return;

        let newShape: Shape | null = null;

        if (currentTool === "rect") {
          const width = Math.min(p.mouseX - startX, p.width - startX);
          const height = Math.min(p.mouseY - startY, p.height - startY);
          newShape = {
            type: "rect",
            x: startX,
            y: startY,
            width,
            height
          };
        } else if (currentTool === "circle") {
          const maxRadius = Math.min(
            Math.min(p.width - startX, startX),
            Math.min(p.height - startY, startY)
          );
          const radius = Math.min(
            Math.max(
              Math.abs(p.mouseX - startX),
              Math.abs(p.mouseY - startY)
            ) / 2,
            maxRadius
          );
          const centerX = startX + (p.mouseX - startX) / 2;
          const centerY = startY + (p.mouseY - startY) / 2;
          newShape = {
            type: "circle",
            centerX,
            centerY,
            radius
          };
        } else if (currentTool === "triangle") {
          const x1 = startX;
          const y1 = startY;
          const x2 = Math.min(p.mouseX, p.width);
          const y2 = Math.min(p.mouseY, p.height);
          const x3 = x1 + (x2 - x1) / 2;
          const y3 = Math.max(y1 - Math.abs(x2 - x1), 0);
          newShape = {
            type: "triangle",
            x1, y1, x2, y2, x3, y3
          };
        }

        if (newShape) {
          shapesRef.current.push(newShape);
          sendShapeToBackendAndSocket(roomId, newShape, socket);
        }

        drawAllObjects(p, shapesRef.current);
        isDrawingNew = false;
        drawing = false;
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        drawAllObjects(p, shapesRef.current);
      };
    };

    const myP5 = new p5(sketch);
    p5InstanceRef.current = myP5;
    return () => myP5.remove();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", background: "black" }}>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 8,
          zIndex: 10,
          padding: "6px 10px",
          background: "rgba(0, 0, 0, 0.8)",
          borderRadius: 6,
          fontSize: 13,
          color: "white",
        }}
      >
        <strong style={{ marginRight: 8 }}>Tool:</strong>
        <label style={{ marginRight: 6 }}>
          <input
            type="radio"
            name="tool"
            checked={tool === "pencil"}
            onChange={() => setTool("pencil")}
          />
          Pencil
        </label>

        <label style={{ marginRight: 6 }}>
          <input
            type="radio"
            name="tool"
            checked={tool === "rect"}
            onChange={() => setTool("rect")}
          />
          Rectangle
        </label>

        <label style={{ marginRight: 6 }}>
          <input
            type="radio"
            name="tool"
            checked={tool === "circle"}
            onChange={() => setTool("circle")}
          />
          Circle
        </label>

        <label style={{ marginRight: 6 }}>
          <input
            type="radio"
            name="tool"
            checked={tool === "triangle"}
            onChange={() => setTool("triangle")}
          />
          Triangle
        </label>

        <div style={{ marginLeft: 16, display: "inline-block" }}>
          <button 
            style={{
              padding: '4px 12px', 
              borderRadius: 4, 
              background: '#2563eb', 
              color: 'white', 
              border: 'none', 
              fontWeight: 600, 
              cursor: 'pointer'
            }} 
            onClick={handleClearCanvas}
          >
            Clear Canvas
          </button>
        </div>
      </div>

      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

