import { connect } from "@/lib/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    console.log(" MongoDB Connection Successful");
    return NextResponse.json({ message: " MongoDB Connection Successful" });
  } catch (error) {
    console.error(" MongoDB Connection Failed", error);
    return NextResponse.json({ message: " MongoDB Connection Failed" }, { status: 500 });
  }
}