import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, {params}) => {
  await connectToDB();
  try {
const prompt = await Prompt.find({}).populate('creator')


return new Response(JSON.stringify(prompt), {status: 200})
  } catch (error) {
    return new Response("Could not fetch prompts", { status: 500 });
  }
};
