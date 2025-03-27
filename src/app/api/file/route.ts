import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(res: Request) {
    try {
        const { blobs } = await list({
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        
        return NextResponse.json(blobs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || '';

        if(filename && request.body){ 

        const blob = await put(filename, request.body, {
            access: 'public',
        });

        return NextResponse.json(blob);
    }else{
        return NextResponse.json({message: "No file"});
    }
}
