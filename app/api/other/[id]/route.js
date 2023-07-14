import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET (Read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const creatorPrompt = await Prompt.find({}).populate("creator");
    const prompt = creatorPrompt.filter(
      (p) => p.creator.username === params.id
    );

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
