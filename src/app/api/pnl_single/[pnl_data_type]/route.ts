import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

interface MyResponseType extends NextResponse {
    params: { pnl_data_type: string };
}

export async function GET (req: Request, res: MyResponseType) {
    try {
        const client = await clientPromise;
        const db = client.db("pnl_data");

        const { params } = res;
      
        const singleData = await db.collection("data_type").findOne({ pnl_data_type: params.pnl_data_type });

        return NextResponse.json(singleData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
