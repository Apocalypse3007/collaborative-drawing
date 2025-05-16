//extracts the roomId from the URL and passes it to the ws_Canvas component
import WSCanvas from "@/app/draw/ws_canvas";
export default async function Page({ params }:  {
    params: { 
        roomId: string 
    }
}) {
    const  roomId  = (await params). roomId ;
  console.log("CanvasPage", roomId);
  return <WSCanvas roomId={roomId} />;
}