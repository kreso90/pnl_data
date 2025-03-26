import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req: Request, { params }: { params: { pnl_data_type: string } }) {
    try {
        const client = await clientPromise;
        const db = client.db("pnl_data");

        const singleData = await db.collection("data_type").findOne({ pnl_data_type: params.pnl_data_type });

        return NextResponse.json(singleData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
