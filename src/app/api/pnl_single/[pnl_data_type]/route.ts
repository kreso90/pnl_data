import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

interface MyResponseType extends NextResponse {
    params: { pnl_data_type: string };
}

export async function GET (req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("pnl_data");

        const parts = req.url.split("/");
        const pnl_data_type = parts[parts.length - 1];
      
        const singleData = await db.collection("data_type").findOne({ pnl_data_type: pnl_data_type });

        return NextResponse.json(singleData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}


export async function PATCH(req: Request) { 
    try {
        const { items } = await req.json();

        const client = await clientPromise;
        const db = client.db("pnl_data");

        const parts = req.url.split("/");
        const pnl_data_type = parts[parts.length - 1];

        let updateFields: Record<string, any> = {};

        for (const itemKey in items) {
            for (const field in items[itemKey]) {
                updateFields[`items.${itemKey}.${field}`] = items[itemKey][field];
            }
        }

        const result = await db.collection("data_type").updateOne(
            { pnl_data_type: pnl_data_type },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Details updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating items:", error);
        return NextResponse.json({ error: "Failed to update data"  }, { status: 500 });
    }
}
