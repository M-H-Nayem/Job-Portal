// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    // Google Sign-in
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email + Password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("Job-Portal");

        // Find user
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // When user logs in for the first time
      if (user) {
        token.id = user.id;      // Save MongoDB _id in token
        token.role = user.role;  // Save role in token
      }

      if (!token.role) {
      token.role = "jobseeker"; // default role
    }
      
      return token;
    },

    

    async session({ session, token }) {
      // Attach token values to session
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
