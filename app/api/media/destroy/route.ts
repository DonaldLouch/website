import { v2 as cloudinary } from "cloudinary"

// import "@/lib/Cloudinary";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { mediaID, mediaFolder } = (await request.json()) as any;
  const mediaPath = `${mediaFolder}/${mediaID}`;
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
    secure: true,
  });
  // try {
    cloudinary.uploader
      .destroy(mediaPath)
      .then((result: any) => {console.log(result); return NextResponse.json(result)});
  // cloudinary.uploader.destroy(mediaPath, function (error: any, result: any) {
  //   return NextResponse.json(result);
  // });
  // cloudinary.v2.uploader.destroy(mediaPath).then((result: any) => {
  //   // return NextResponse.json(result);
  //   console.log(result);
  // });
  // const supabase = createRouteHandlerClient<Database>({ cookies });
  // const { error, data, status, statusText } = await supabase
  //   .from("Media")
  //   .delete()
  //   .match({ mediaPublicID: mediaID });
  // console.log(error, data, status, statusText);
  
  // } catch (error) {
  //   console.log(error);
  //   // return NextResponse.json(error);
  // }
}
