import {OpenAI} from "openai";
import { NextResponse } from "next/server";
import{connect} from "@/lib/connect";
import Prompt from "@/model/recommendation"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function POST(req: Request) {
        const { country, state } = await req.json();
    if(!country) {
        return NextResponse.json({error: 'Missing country field'},{status: 400});
        }
    let location;
    if(state) {
            location = `${state}, ${country}`;
    } else {
            location = country;
    }
    const prompt = `give me top 10 places to visit  ${location}
    also,just give me their names no other thing is needed,just name i am using this to make a website in which i have to recommend this places to the user and i want only names no prior or any other information so that i can directly include them in my schema `;
    try{
            const response = await openai.chat.completions.create({
                model : "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
    });
    console.log(response.choices[0].message.content);

    return NextResponse.json({ response }, { status: 200 });
    } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}



export async function GET(req: Request){
        const { country, state } = await req.json();
        if(!country) {
            return NextResponse.json({error: 'Missing country field'},{status: 400});
            }
        let location;
        if(state) {
                location = `${state}, ${country}`;
        } else {
                location = country;
        }
        try{      await connect();
                const prompt = await Prompt.find({country, state}).sort({ createdAt: -1 });
                if(prompt.length===0){
                        return NextResponse.json({ message:"No prompt found"},{status: 201});
                }

        }
        catch(error){
                console.log(error)
                return NextResponse.json({message:"Internal server error"}, { status: 500 })
        }

}