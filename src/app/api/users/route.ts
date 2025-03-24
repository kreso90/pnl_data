import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("pnl_data");

        const user = await db.collection("users").findOne({email: "test@test.com"});
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
