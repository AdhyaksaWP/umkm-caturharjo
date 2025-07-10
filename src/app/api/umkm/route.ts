import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db("umkm");
        const col = db.collection("dummy_umkm");
        
        const body = await req.json();
        const createCondition = body.Tipe && body.Nama && body.Alamat && body.Keterangan && !body.Page;

        if (createCondition){
            try{
                const res = await col.insertOne({
                    Nama: body.Nama,
                    Tipe: body.Tipe,
                    Alamat: body.Alamat,
                    Keterangan: body.Keterangan
                })
                if (!res) {
                    return NextResponse.json({"erorr": res}, {"status": 500});
                }
                return NextResponse.json({"message": "Successfully created a new UMKM!"}, {"status": 201});
            } catch (e) {
                return NextResponse.json({"erorr": e}, {"status": 500});
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