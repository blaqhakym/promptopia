import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();
    
    const { userId, tag, prompt } = body;

    const newPrompt = await Prompt.create({
      creator: userId,
      tag,
      prompt,
    });

    // const newPrompt = await Prompt.create({
    //       creator: userId,
    //       tag,
    //       prompt,
    //     })
    // await newPrompt.save();

    return NextResponse.json(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response({ status: 500 });
  }
}
