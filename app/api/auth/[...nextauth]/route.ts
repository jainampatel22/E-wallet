import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client'
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
const handler = NextAuth({
    providers:[
github({
    clientId:process.env.GITHUB_ID  ||"",
    clientSecret:process.env.GITHUB_SECRET  ||"",
}),
Google({
    clientId:process.env.GOOGLE_ID ||"",
    clientSecret:process.env.GOOGLE_SECRET  ||""
}),
CredentialsProvider({
  name: 'Credentials',
  credentials: {
    phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
    password: { label: "Password", type: "password", required: true }
  },
  // TODO: User credentials type from next-aut
  async authorize(credentials: any) {
    // Do zod validation, OTP validation here
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const existingUser = await prisma.user.findFirst({
        where: {
            number: credentials.phone
        }
    });

    if (existingUser) {
        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.Password);
        if (passwordValidation) {
            return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number
            }
        }
        return null;
    }

    try {
        const user = await prisma.user.create({
            data: {
                number: credentials.phone,
                Password: hashedPassword
            }
        });
    
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.number
        }
    } catch(e) {
        console.error(e);
    }

    return null
  },
  })

  
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub
            console.log(session)
            return session
         
        }
    }

})
export {handler as GET,handler as POST}