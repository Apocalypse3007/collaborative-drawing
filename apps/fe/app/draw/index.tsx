"use client";

import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { useParams } from "next/navigation";

export default function CanvasPage() {
  const { roomID } = useParams<{ roomID: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const toolRef = useRef<"pen" | "square" | "circle" | "triangle">("pen");
  const objectsRef = useRef<any[]>([]);

  const [tool, setTool] = useState<"pen" | "square" | "circle"| "triangle" >("pen");
 
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  // Clear canvas handler
  const handleClearCanvas = () => {
    const p = p5InstanceRef.current;
    objectsRef.current = [];
    if (p) {
      p.clear();
      p.background(255);
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
      let snapshot: p5.Image;
      let circleDiameter = 0;
      let trianglePreview: p5.Image;
      let isDrawingNew = false;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(containerRef.current!);
        p.background(255);
        p.strokeWeight(2);
        p.stroke(0);
        p.noFill();
        p.angleMode(p.DEGREES);
      };

      function drawAllObjects() {
        p.clear(255, 255, 255, 255);
        p.background(255);
        for (const obj of objectsRef.current) {
          p.push();
          if (obj.type === "square") {
            p.square(obj.x, obj.y, obj.side);
          } else if (obj.type === "circle") {
            p.circle(obj.cx, obj.cy, obj.diameter);
          } else if (obj.type === "triangle") {
            p.triangle(obj.x1, obj.y1, obj.x2, obj.y2, obj.x3, obj.y3);
          } else if (obj.type === "pen") {
            for (let i = 1; i < obj.points.length; i++) {
              p.line(obj.points[i-1].x, obj.points[i-1].y, obj.points[i].x, obj.points[i].y);
            }
          }
          p.pop();
        }
      }

      function isInsideSquare(mx: number, my: number, obj: any) {
        return mx >= obj.x && mx <= obj.x + obj.side && my >= obj.y && my <= obj.y + obj.side;
      }
      function isInsideCircle(mx: number, my: number, obj: any) {
        const dx = mx - obj.cx;
        const dy = my - obj.cy;
        return Math.sqrt(dx*dx + dy*dy) <= obj.diameter/2;
      }
      function isInsideTriangle(mx: number, my: number, obj: any) {
        // Barycentric technique
        const {x1, y1, x2, y2, x3, y3} = obj;
        const area = 0.5 *(-y2*x3 + y1*(-x2 + x3) + x1*(y2 - y3) + x2*y3);
        const s = 1/(2*area)*(y1*x3 - x1*y3 + (y3-y1)*mx + (x1-x3)*my);
        const t = 1/(2*area)*(x1*y2 - y1*x2 + (y1-y2)*mx + (x2-x1)*my);
        const u = 1 - s - t;
        return s >= 0 && t >= 0 && u >= 0;
      }

      p.mousePressed = () => {
        if (p.mouseX < 220 && p.mouseY < 60) return;
        const currentTool = toolRef.current;
        // Try to select an object
        selectedObjectIndex = null;
        for (let i = objectsRef.current.length - 1; i >= 0; i--) {
          const obj = objectsRef.current[i];
          if (
            (obj.type === "square" && isInsideSquare(p.mouseX, p.mouseY, obj)) ||
            (obj.type === "circle" && isInsideCircle(p.mouseX, p.mouseY, obj)) ||
            (obj.type === "triangle" && isInsideTriangle(p.mouseX, p.mouseY, obj))
          ) {
            selectedObjectIndex = i;
            if (obj.type === "square") {
              dragOffset = { x: p.mouseX - obj.x, y: p.mouseY - obj.y };
            } else if (obj.type === "circle") {
              dragOffset = { x: p.mouseX - obj.cx, y: p.mouseY - obj.cy };
            } else if (obj.type === "triangle") {
              dragOffset = { x: p.mouseX - obj.x1, y: p.mouseY - obj.y1 };
            }
            isDrawingNew = false;
            return;
          }
        }
        // If not selecting, start drawing new
        isDrawingNew = true;
        if (currentTool === "pen") {
          drawing = true;
          prevX = p.mouseX;
          prevY = p.mouseY;
          objectsRef.current.push({ type: "pen", points: [{ x: prevX, y: prevY }] });
        } else if (currentTool === "square") {
          startX = p.mouseX;
          startY = p.mouseY;
        } else if (currentTool === "circle") {
          startX = p.mouseX;
          startY = p.mouseY;
        } else if (currentTool === "triangle") {
          startX = p.mouseX;
          startY = p.mouseY;
        }
      };

      p.mouseDragged = () => {
        const currentTool = toolRef.current;
        if (selectedObjectIndex !== null) {
          // Move the selected object
          const obj = objectsRef.current[selectedObjectIndex];
          if (obj.type === "square") {
            obj.x = p.mouseX - dragOffset.x;
            obj.y = p.mouseY - dragOffset.y;
          } else if (obj.type === "circle") {
            obj.cx = p.mouseX - dragOffset.x;
            obj.cy = p.mouseY - dragOffset.y;
          } else if (obj.type === "triangle") {
            const dx = p.mouseX - dragOffset.x - obj.x1;
            const dy = p.mouseY - dragOffset.y - obj.y1;
            obj.x1 += dx;
            obj.y1 += dy;
            obj.x2 += dx;
            obj.y2 += dy;
            obj.x3 += dx;
            obj.y3 += dy;
            dragOffset = { x: p.mouseX - obj.x1, y: p.mouseY - obj.y1 };
          }
          drawAllObjects();
          return;
        }
        if (!isDrawingNew) return;
        if (currentTool === "pen" && drawing) {
          p.line(prevX, prevY, p.mouseX, p.mouseY);
          prevX = p.mouseX;
          prevY = p.mouseY;
          objectsRef.current[objectsRef.current.length - 1].points.push({ x: prevX, y: prevY });
        } else if (currentTool === "square") {
          drawAllObjects();
          const dx = p.mouseX - startX;
          const dy = p.mouseY - startY;
          const side = Math.max(Math.abs(dx), Math.abs(dy));
          const topLeftX = dx < 0 ? startX - side : startX;
          const topLeftY = dy < 0 ? startY - side : startY;
          p.square(topLeftX, topLeftY, side);
        } else if (currentTool === "circle") {
          drawAllObjects();
          const dx = p.mouseX - startX;
          const dy = p.mouseY - startY;
          const diameter = Math.max(Math.abs(dx), Math.abs(dy)) * 2;
          const centerX = dx < 0 ? startX - diameter / 2 : startX + diameter / 2;
          const centerY = dy < 0 ? startY - diameter / 2 : startY + diameter / 2;
          p.circle(centerX, centerY, diameter);
        } else if (currentTool === "triangle") {
          drawAllObjects();
          const x1 = startX;
          const y1 = startY;
          const x2 = p.mouseX;
          const y2 = p.mouseY;
          const x3 = x1 + (x2 - x1) / 2;
          const y3 = y1 - Math.abs(x2 - x1);
          p.triangle(x1, y1, x2, y2, x3, y3);
        }
      };

      p.mouseReleased = () => {
        const currentTool = toolRef.current;
        if (selectedObjectIndex !== null) {
          selectedObjectIndex = null;
          return;
        }
        if (!isDrawingNew) return;
        if (currentTool === "pen") {
          drawing = false;
        } else if (currentTool === "square") {
          const dx = p.mouseX - startX;
          const dy = p.mouseY - startY;
          const side = Math.max(Math.abs(dx), Math.abs(dy));
          const topLeftX = dx < 0 ? startX - side : startX;
          const topLeftY = dy < 0 ? startY - side : startY;
          objectsRef.current.push({ type: "square", x: topLeftX, y: topLeftY, side });
          drawAllObjects();
        } else if (currentTool === "circle") {
          const dx = p.mouseX - startX;
          const dy = p.mouseY - startY;
          const diameter = Math.max(Math.abs(dx), Math.abs(dy)) * 2;
          const centerX = dx < 0 ? startX - diameter / 2 : startX + diameter / 2;
          const centerY = dy < 0 ? startY - diameter / 2 : startY + diameter / 2;
          objectsRef.current.push({ type: "circle", cx: centerX, cy: centerY, diameter });
          drawAllObjects();
        } else if (currentTool === "triangle") {
          const x1 = startX;
          const y1 = startY;
          const x2 = p.mouseX;
          const y2 = p.mouseY;
          const x3 = x1 + (x2 - x1) / 2;
          const y3 = y1 - Math.abs(x2 - x1);
          objectsRef.current.push({ type: "triangle", x1, y1, x2, y2, x3, y3 });
          drawAllObjects();
        }
        isDrawingNew = false;
      };

      p.windowResized = () => {
        drawAllObjects();
      };
    };

    const myP5 = new p5(sketch);
    p5InstanceRef.current = myP5;
    return () => myP5.remove();
  }, []); // Only run once on mount

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 10,
          padding: "6px 10px",
          background: "rgba(240,240,240,0.9)",
          borderRadius: 6,
          fontSize: 13,
        }}
      >
        <strong style={{ marginRight: 8 }}>Tool:</strong>
        <label style={{ marginRight: 6 }}>
          <input
            type="radio"
            name="tool"
            checked={tool === "pen"}
            onChange={() => setTool("pen")}
          />
          Pen
        </label>

        <label>
          <input
            type="radio"
            name="tool"
            checked={tool === "square"}
            onChange={() => setTool("square")}
          />
          Square
        </label>

        <label>
        <input
            type="radio"
            name="tool"
            checked={tool === "circle"}
            onChange={() => setTool("circle")}
        />
        Circle
        </label>

        <label>
        <input
            type="radio"
            name="tool"
            checked={tool === "triangle"}
            onChange={() => setTool("triangle")}
        />
        Triangle
        </label>
        <button style={{marginLeft: 16, padding: '4px 12px', borderRadius: 4, background: '#2563eb', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer'}} onClick={handleClearCanvas}>
          Clear Canvas
        </button>
      </div>

      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}


