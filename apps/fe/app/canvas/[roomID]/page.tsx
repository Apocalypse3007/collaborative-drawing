"use client";

import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { useParams } from "next/navigation";

export default function CanvasPage() {
  const { roomID } = useParams<{ roomID: string }>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [tool, setTool] = useState<"pen" | "square">("pen");

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let drawing = false;
      let prevX = 0, prevY = 0;
      let startX = 0, startY = 0;
      let snapshot: p5.Image;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(containerRef.current!);
        p.background(255);
        p.strokeWeight(2);
        p.stroke(0);
        p.noFill();
        p.angleMode(p.DEGREES);
      };

      p.mousePressed = () => {
        if (p.mouseX < 220 && p.mouseY < 60) return;

        if (tool === "pen") {
          drawing = true;
          prevX = p.mouseX;
          prevY = p.mouseY;
        } else if (tool === "square") {
          startX = p.mouseX;
          startY = p.mouseY;
          snapshot = p.get(); // save current canvas state
        }
      };

      p.mouseDragged = () => {
        if (tool === "pen" && drawing) {
          p.line(prevX, prevY, p.mouseX, p.mouseY);
          prevX = p.mouseX;
          prevY = p.mouseY;
        }
      
        if (tool === "square") {
          p.image(snapshot, 0, 0); // restore canvas
      
          const dx = p.mouseX - startX;
          const dy = p.mouseY - startY;
          const side = Math.max(Math.abs(dx), Math.abs(dy));
      
          const topLeftX = dx < 0 ? startX - side : startX;
          const topLeftY = dy < 0 ? startY - side : startY;
      
          p.square(topLeftX, topLeftY, side);
        }
      };
      
      p.mouseReleased = () => {
        if (tool === "pen") {
          drawing = false;
        } else if (tool === "square") {
          const dx = p.mouseX - startX;
          const dy = p.mouseY - startY;
          const side = Math.max(Math.abs(dx), Math.abs(dy));
      
          const topLeftX = dx < 0 ? startX - side : startX;
          const topLeftY = dy < 0 ? startY - side : startY;
      
          p.image(snapshot, 0, 0);
          p.square(topLeftX, topLeftY, side);
        }
      };
      
      p.windowResized = () => {
        const snapshot = p.get();
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        p.background(255);
        p.image(snapshot, 0, 0);
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove();
  }, [tool]);

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
      </div>

      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
