import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const timestamp = Math.round((new Date).getTime() / 1000)
    const publicId = `menu-${timestamp}`;

    const signature = cloudinary.utils.api_sign_request({
        timestamp,
        folder: 'menu',
        public_id: publicId
    }, process.env.API_SECRET!)

    return {
        statusCode: 200,
        body: JSON.stringify({
            signature,
            timestamp,
            publicId,
            cloudName: process.env.CLOUD_NAME,
            apiKey: process.env.API_KEY
        }),
    };
}

export { handler };