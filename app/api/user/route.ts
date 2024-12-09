import { authOptions } from "@/app/libs/auth";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const GET =async()=>{
const session = await getServerSession(authOptions)
if(!session){
 return   NextResponse.json({
        message:"You are Not Loggedin"
    })

}
return NextResponse.json({
    session:session.user.email
})
}