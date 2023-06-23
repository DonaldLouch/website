import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createId } from "@paralleldrive/cuid2";

export async function POST(request: Request) {
  const {
    mediaPublicID,
    mediaSignature,
    mediaKind,
    mediaTitle,
    mediaExtension,
    mediaPath,
    mediaSize,
    mediaDimensions,
  } = (await request.json()) as any
  // const { name, email, subject, message } = (await request.json()) as any;
  const mediaID = createId();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: supData } = (await supabase
    .from("Media")
    .insert({
      mediaID,
      mediaPublicID,
      mediaSignature,
      mediaKind,
      mediaTitle,
      mediaExtension,
      mediaPath,
      mediaSize,
      mediaDimensions,
    })
    .select()) as any;
  
  return NextResponse.json(supData);
}
