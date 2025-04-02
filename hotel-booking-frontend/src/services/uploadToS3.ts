import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Config";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

export async function uploadFile(file: File): Promise<string> {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `destinos/${file.name}`,
        Body: file,
        ContentType: file.type,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        return `https://${BUCKET_NAME}.s3.amazonaws.com/destinos/${file.name}`;
    } catch (err) {
        console.error("Erro no upload:", err);
        throw err;
    }
}
