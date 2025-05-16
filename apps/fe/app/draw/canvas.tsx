"use client";

import CanvasPage from "@/app/draw/index";

interface CanvasPageWrapperProps {
  roomId: string;
}

export default function CanvasPageWrapper({ roomId }: CanvasPageWrapperProps) {
  console.log("CanvasPageWrapper", roomId);
  return <CanvasPage roomId={roomId} />;
}
