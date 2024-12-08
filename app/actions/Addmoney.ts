
"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../libs/auth";
import { PrismaClient } from "@prisma/client";
 export default async  function addmoney(amount:number,provider:string){
const session = await getServerSession(authOptions)
const prisma  = new PrismaClient()
const userId = session.user.id
const token = Math.random().toString()
if(!userId){
    return {message:"You are not logged In"}
}
await prisma.onRampTranscation.create({
    data:{
     userId:Number(userId),
     amount:amount,
     status:"Processing",
startTime:new Date(),
token:token,
provider,


    }
})


}
