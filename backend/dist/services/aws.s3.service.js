// import {
//     S3Client,
//     PutObjectCommand,
//     DeleteObjectCommand,
//     paginateListObjectsV2,
//     GetObjectCommand,
//     paginateListBuckets,
//     S3ServiceException,
//     ListObjectsCommand,
// } from "@aws-sdk/client-s3";
export {};
// import type { Owner, Bucket, _Object } from "@aws-sdk/client-s3"
// const client = new S3Client({
//     region: 'us-east-2',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//     }
// });
// export const listBuckets = async () => {
//     let owner: Owner | undefined;
//     const buckets: Bucket[] = [];
//     try {
//         const paginator = paginateListBuckets({ client }, {});
//         for await (const page of paginator) {
//             if (!owner) {
//                 owner = page.Owner;
//             }
//             buckets.push(...(page.Buckets ?? []));
//         }
//         console.log(buckets);
//     } catch (error: unknown) {
//         if (error instanceof S3ServiceException) {
//             console.error(
//                 `Error from S3: ${error.name}: ${error.message}`,
//             );
//         } else {
//             throw error;
//         }
//     }
// }
// export const listFilesInBucket = async () => {
//     const objects: _Object[] = [];
//     try {
//         const paginator = paginateListObjectsV2({ client }, { Bucket: process.env.S3_BUCKET_NAME })
//         for await (const page of paginator) {
//             objects.push(...page.Contents ?? []);
//         }
//         console.log(objects);
//     } catch (error) {
//         if (error instanceof S3ServiceException) {
//             console.error(`S3 error: ${error.name}: ${error.message}`,)
//         }
//         throw error;
//     }
// }
//# sourceMappingURL=aws.s3.service.js.map