import { ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Config";

const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

export async function listarImagens(prefix: string): Promise<string[]> {
    try {
        const data = await s3Client.send(new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: prefix,
        }));

        return (data.Contents as _Object[])
            ?.filter((obj) => obj.Key && /\.(jpg|jpeg|png|webp|avif)$/i.test(obj.Key)) // só imagens
            .map((obj) => `https://${BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`) || [];

    } catch (err) {
        console.error("Erro ao listar imagens:", err);
        return [];
    }
}
