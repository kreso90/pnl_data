import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

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
        const requestBody = await req.json();
        if (!requestBody || Object.keys(requestBody).length === 0) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("pnl_data");

        const urlParts = req.url.split("/");
        const pnl_data_type = urlParts[urlParts.length - 1] || "";

        if (!pnl_data_type) {
            return NextResponse.json({ error: "Invalid pnl_data_type" }, { status: 400 });
        }

        let updateFields: Record<string, any> = {};
        
        if (pnl_data_type != "pnl_token") {
            if (requestBody.items) {
                for (const itemKey in requestBody.items) {
                    for (const field in requestBody.items[itemKey]) {
                        updateFields[`items.${itemKey}.${field}`] = requestBody.items[itemKey][field];
                    }
                }
            }
        }

        for (const key in requestBody) {
            if (key !== "items") {
                updateFields[key] = requestBody[key];
            }
        }

        const result = await db.collection("data_type").updateOne(
            { pnl_data_type: pnl_data_type },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating data:", error);
        return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const { newItem } = await req.json();
        const client = await clientPromise;
        const db = client.db("pnl_data");
   
        const parts = req.url.split("/");
        const pnl_data_type = parts[parts.length - 1]; 

        const existingData = await db.collection("data_type").findOne({ pnl_data_type: pnl_data_type });

        if (!existingData) {
            return NextResponse.json({ error: "Data with the given pnl_data_type not found" }, { status: 404 });
        }

        const itemKey = crypto.randomUUID();

        const updatedItems = {
            ...existingData.items,
            [itemKey]: newItem,
        };

        await db.collection("data_type").updateOne(
            { pnl_data_type: pnl_data_type },
            { $set: { items: updatedItems } }
        );

        return NextResponse.json({ message: "New item added successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error adding new item:", error);
        return NextResponse.json({ error: "Failed to add new item" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { itemKey } = await req.json();
        const client = await clientPromise;
        const db = client.db("pnl_data");

        const parts = req.url.split("/");
        const pnl_data_type = parts[parts.length - 1];

        const existingData = await db.collection("data_type").findOne({ pnl_data_type });

        if (!existingData) {
            return NextResponse.json({ error: "Data with the given pnl_data_type not found" }, { status: 404 });
        }

        if (!existingData.items[itemKey]) {
            return NextResponse.json({ error: "Item with the given itemKey not found" }, { status: 404 });
        }

        const updatedItems = { ...existingData.items };
        delete updatedItems[itemKey];

        await db.collection("data_type").updateOne(
            { pnl_data_type },
            { $set: { items: updatedItems } }
        );

        return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
        
    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
      const { items } = await req.json();
      const client = await clientPromise;
      const db = client.db("pnl_data");
  
      const parts = req.url.split("/");
      const pnl_data_type = parts[parts.length - 1]; 
  
      const existingData = await db.collection("data_type").findOne({ pnl_data_type: pnl_data_type });
  
      if (!existingData) {
        return NextResponse.json({ error: "Data with the given pnl_data_type not found" }, { status: 404 });
      }
  
      await db.collection("data_type").updateOne(
        { pnl_data_type: pnl_data_type },
        { $set: { items: items } }
      );
  
      return NextResponse.json({ message: "Items updated successfully" }, { status: 200 });
  
    } catch (error) {
      console.error("Error updating items:", error);
      return NextResponse.json({ error: "Failed to update items" }, { status: 500 });
    }
}
  