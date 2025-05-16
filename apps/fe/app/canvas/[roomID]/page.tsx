import CanvasPageWrapper from "@/app/draw/canvas";



export default async function Page({ params }:  {
    params: { 
        roomId: string 
    }
}) {
    const  roomId  = (await params). roomId ;
  console.log("CanvasPage", roomId);
  return <CanvasPageWrapper roomId={roomId} />;
}