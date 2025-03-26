import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET({ params }: { params: { pnl_data_type: string } }) {
    try {
        
        const client = await clientPromise;
        const db = client.db("pnl_data");

        console.log(params?.pnl_data_type)
        const data = await db.collection("data_type").find({}).toArray();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
