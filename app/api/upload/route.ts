import { handleFileUpload } from "@/app/controllers/upload.controller";

export async function POST(req: any) {
    return handleFileUpload(req)
}
