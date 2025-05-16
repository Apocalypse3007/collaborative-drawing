"use client";

import CanvasPage from "@/app/draw/index";

interface CanvasPageWrapperProps {
  roomId: string;
  socket: WebSocket;
}

export default function Canvas({ roomId, socket }: CanvasPageWrapperProps) {
  console.log("CanvasPageWrapper", roomId);
  return <CanvasPage roomId={roomId} socket={socket} />;
}
