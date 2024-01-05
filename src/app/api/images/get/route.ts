import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/utils/logger";

const s3 = new S3();
const bucketName = process.env.AWS_BUCKET_NAME ?? "";

/**
 * This file defines the handler for the route / api / images / get.
 * The URL structure is / api / images / get ?vehicleId= <id> &amount= <amount>.
 * 
 * The handler supports GET requests and returns all images for the vehicle with the given id.
 * 
 * @param {NextRequest} req The incoming request object
 * @param {NextResponse} res The response object
 **/
export async function GET(req: NextRequest, res: NextResponse) {
    const vehicleId = req.nextUrl.searchParams.get("vehicleId");
    const amount = req.nextUrl.searchParams.get("amount") ? parseInt(req.nextUrl.searchParams.get("amount") as string, 10) : undefined;

    if (!vehicleId) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: "No vehicle id provided",
            }),
            { status: 400 }
        );
    }

    const params = {
        Bucket: bucketName,
        Prefix: `${vehicleId}/`,
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        let images = data.Contents
            ? await Promise.all(
                data.Contents
                    .filter((object) => !object.Key?.endsWith('/'))
                    .map(async (object) => {
                        const headObjectParams = {
                            Bucket: bucketName,
                            Key: object.Key as string,
                        }

                        const metadata = await s3.headObject(headObjectParams).promise();
                        return {
                            imageUrl: `https://${bucketName}.s3.amazonaws.com/${object.Key}`,
                            blurhash: metadata.Metadata?.blurhash,
                        }
                    })
            )
            : [];

        if (amount) {
            images = images.slice(0, amount);
        }

        return new NextResponse(JSON.stringify({
            status: "success",
            images: images,
        }), { status: 200 });
    } catch (e) {
        logger.error('Error listing objects in S3:', e);
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e,
            }),
            { status: 500 }
        );
    }
}