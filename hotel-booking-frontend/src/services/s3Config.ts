import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID!,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY!,
    },
});

export { s3Client };
