import { NextApiRequest,NextApiResponse } from "next";
// import {} from @/lib/connectdb
import { NextResponse } from "next/server";
import Prompt from "@/model/recommendation";

export  async function POST(req:Request){
       try{
           const {country ,state,userQuery} = await req.json();
           const prompt = await Prompt.create({country,state,userQuery})
               return NextResponse.json({message:"prompt created", prompt}, { status: 201 })
       }
       catch(error){
        console.log(error)
        return NextResponse.json({message:"Internal server error"}, { status: 500 })
       }

}
