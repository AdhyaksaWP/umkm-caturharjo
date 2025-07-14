import client from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request){
    const session = await getServerSession(authOptions);
    
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db("umkm");
        const col = db.collection("dummy_umkm");
        
        const body = await req.json();
        const createCondition = body.Tipe && body.Nama && body.Alamat && body.Keterangan && !body.Page;

        if (createCondition){
            // Only authenticated users are allowed to create a new UMKM
            if (!session){
                return NextResponse.json({"error": "Not authenticated"}, {"status": 401})
            }
            try{
                const { Nama, Tipe, Alamat, Keterangan , Gambar } = body;
                const res = await col.insertOne({
                    Nama: Nama,
                    Tipe: Tipe,
                    Alamat: Alamat,
                    Keterangan: Keterangan,
                    Gambar: Gambar
                })
                if (!res) {
                    return NextResponse.json({"error": res}, {"status": 500});
                }
                return NextResponse.json({"message": "Successfully created a new UMKM!"}, {"status": 201});
            } catch (e) {
                return NextResponse.json({"error": e}, {"status": 500});
            }
        }

        const url = new URL(req.url);
        const limitParam = url.searchParams.get("limit");
        const limit = limitParam ? parseInt(limitParam) : 0;

        if (!body.Tipe || !body.Page){
            return NextResponse.json({"error": "Json format error!"}, {"status": 500});
        }

        const query: any = {
            Tipe: body.Tipe,
        }

        // If there were search params
        if (body.search) { 
            query.Nama = { $regex: body.search, $options: "i" }; 
        }

        const data = await col
        .find(query)
        .skip((body.Page - 1) * limit)
        .limit(limit).toArray();

        return NextResponse.json({
            "data": data
        }, {"status": 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({"error": error}, {"status": 500});
    }
}