import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    paginateListObjectsV2,
    GetObjectCommand,
    paginateListBuckets,
    S3ServiceException,
    ListObjectsCommand,
} from "@aws-sdk/client-s3";

import type { Owner, Bucket, _Object } from "@aws-sdk/client-s3"

const client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export const listBuckets = async () => {
    let owner: Owner | undefined;

    const buckets: Bucket[] = [];

    const paginator = paginateListBuckets({ client }, {});

    for await (const page of paginator) {
        if (!owner) {
            owner = page.Owner;
        }

        buckets.push(...(page.Buckets ?? []));
    }
}

export const listFilesInBucket = async () => {
    const objects: _Object[] = [];

    const paginator = paginateListObjectsV2({ client }, { Bucket: process.env.S3_BUCKET_NAME })
    for await (const page of paginator) {
        objects.push(...page.Contents ?? []);
    }
}

export const uploadToS3 = async (file: Express.Multer.File, merchantId: string) => {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `users/${merchantId}/${file.fieldname}-${Date.now()}.${fileExtension}`;

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    })

    const response = await client.send(command);
    console.log(response);

    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

