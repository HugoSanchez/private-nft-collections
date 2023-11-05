import Bundlr from "@bundlr-network/client";
import { NextResponse } from "next/server";

export const config = {
    api: {
      responseLimit: false,
      bodyParser: {
        sizeLimit: '4mb',
      },
    },
}

export async function POST(
    req, 
    res
) {     

    try {
        
        
        let imageUrl
        let data = await req.json()
        let {title, description, image, mimetype} = data

        console.log(mimetype)

        if (image) {
            const buffer = Buffer.from(image, 'base64')
            let tags = {tags: [{ name: "Content-Type", value: mimetype }],}
            let id = await uploadToArweave(buffer, tags)
            imageUrl = `https://arweave.net/${id}`
        }

        let dataToUpload = image ? {...data, image: imageUrl} : {...data}
        let id = await uploadToArweave(JSON.stringify(dataToUpload), false)
        return new NextResponse(JSON.stringify({ url: `https://arweave.net/${id}` }), {
            status: 200,
        });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            url: e
        })
    }
}


async function uploadToArweave(data, tags) {
    let response
    const bundlr = new Bundlr("http://node1.bundlr.network", "matic", process.env.TEST_KEY);
    if (!!tags) {
        response = await bundlr.upload(data, tags)
    }
    else {
        response = await bundlr.upload(data)
    }
    return response.id
}