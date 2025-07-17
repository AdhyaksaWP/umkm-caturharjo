import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: Request, context: any) {
  const session = await getServerSession(authOptions);
  if (!session){
    return NextResponse.json({"error": "Not authenticated"}, {"status": 401})
  }

  const { params } = await context;
  const id = params.id;

  const mongoClient = await client.connect();
  const db = mongoClient.db("umkm");
  const col = db.collection("umkm");

  try {
    const res = await col.deleteOne({ _id: new ObjectId(id) });

    if (res.deletedCount === 0) {
      return NextResponse.json({ error: "UMKM not found." }, { status: 404 });
    }

    return NextResponse.json({ status: 204 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: any) {
  const session = await getServerSession(authOptions);
  if (!session){
    return NextResponse.json({"error": "Not authenticated"}, {"status": 401})
  }
  const { params } = await context;
  const id = params.id;

  const body = await req.json();
  const mongoClient = await client.connect();
  const db = mongoClient.db("umkm");
  const col = db.collection("umkm");

  if (!body.Nama && !body.Tipe && !body.Alamat && !body.Keterangan) {
    return NextResponse.json({ error: "Invalid JSON format!" }, { status: 400 });
  }

  try {
    const res = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (res.matchedCount === 0) {
      return NextResponse.json({ error: "UMKM not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully updated an UMKM!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
