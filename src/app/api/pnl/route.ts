import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("pnl_data");

        const data = await db.collection("data_type").find({}).toArray();
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
