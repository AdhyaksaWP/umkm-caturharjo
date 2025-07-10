import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/lib/mongodb";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                const { email, password } = credentials as { email: string, password: string };

                const mongoClient = await client.connect();
                const db = mongoClient.db("umkm");
                const col = db.collection("admin");           

                const user: any = await col.find({
                    email: email,
                    password: password
                })

                if (!user){
                    throw new Error("No user was found with email and password");
                }

                return { id: user._id, email: user.email, password: user.password }
            }
        })
    ]
}