import {NextResponse} from 'next/server';
import {connect} from '@/lib/connect';
import Prompt from '@/model/recommendation';


export async function GET(req:Request,{params}:{params:{country:string}}){
 const {country}=params;

 if(!country){
    return NextResponse.json({error: 'missing country parameter'},{status: 400});
 }
 try{
    await connect();
    console.log("connected to database");
    const prompts=await Prompt.find({country}).sort({createdAt:-1});
    if(prompts.length===0){
        return NextResponse.json({message:"No prompt found"},{status: 201});
    }
    return NextResponse.json({prompts},{status:200});

 }
 catch(error){
    console.log(error);
    return NextResponse.json({message:"Internal server error"},{status:500});
 }



}