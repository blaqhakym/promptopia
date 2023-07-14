import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"


export const GET = async (req, {params})=>{
 
  try {
    await connectToDB()
    const prompt = await Prompt.find({creator: params.id}).populate('creator') //populate method will remember to fill in the "creator" document since it is referring to another document "User". the command is 'simply populate the creator property while at it'. Without this method the returned prompt will only have the _id of the User document which it is referring to


    return new Response(JSON.stringify(prompt), {status: 200})
  } catch (error) {
    return new Response("Server error", {status: 500})
  }
}