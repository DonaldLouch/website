// controllers/upload.controller.js

import { NextResponse } from "next/server"
import { uploadFileToS3 } from "../actions/backblaze";

export const handleFileUpload = async (req: any) => {
  try {
    const form = await req.formData()
    const files = form.getAll("files") as any

    const payloadRAW = form.get("payload")
    const {
      uploadDestination,
      mediaID,
      bucket,
      uploadEndpoint,
      pathname,
      redirectPath
    } =  JSON.parse(payloadRAW)

    const payload = {
      uploadDestination,
      mediaID,
      bucket,
      uploadEndpoint,
      pathname,
      redirectPath
    } as any


    if (!files || typeof files !== "object" || !files[0].name) {
      return NextResponse.json({ message: "failure", reason: "Invalid file" });
    }

    const uploadURL = await uploadFileToS3(files, payload);
    return NextResponse.json({ message: "success", uploadURL });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "failure", reason: error.message });
  }
};
