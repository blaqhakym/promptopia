import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
  ],

  callbacks: {
    async session({ session }) {
await connectToDB()

      // store user id from mongo to session .ie current signed in user


      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      
      return session
    },

    async signIn({ profile }) { // this function is provided for you to add users to database
      try {
        await connectToDB();

        //check if a user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });

          
        }
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
  },
})


export { handler as GET, handler as POST };



//note that during oauth, once signed in, the user is already given access. But should you wish to save the user to the database, then you need to create a schema for the user and use the Sign In function above to populate the properties with the users details provided in the parameter of the Sign in function as {profile}