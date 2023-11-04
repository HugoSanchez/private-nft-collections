import { NextResponse } from "next/server";

export async function GET() {

   
    return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
        status: 200,
    });
}