import { AuthOptions } from "next-auth";
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
                
                const user = await col.findOne({ email: email, password: password });

                if (!user){
                    return null;
                }

                return { id: user._id.toString(), email: user.email, password: user.password }
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}
