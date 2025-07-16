import { FunctionSquare } from "lucide-react";
import { NextResponse } from "next/server";
export async function POST(req:Request,res:Response) {

    try {
        const body = await req.json()
        const {file_key,file_name} = body
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:"internal error : server"},
            {status:500}
        );
    }
}