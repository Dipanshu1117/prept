"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const completeOnboarding = async (data) => {
    const user = await currentUser();
    if(!user){
        throw new Error("Unauthorised");
    }

    const {role,title,company,yearExp,bio,categories} = data;
    if(!role || !["INTERVIEWEE","INTERVIEWER"].includes(role)){
        throw new Error("Invalid role");
    }

    if(role === "INTERVIEWER"){
        if(!title || !company || !yearExp || !bio || !categories?.length){
            throw new Error("Please fill in all required fields");
        }
    }

    try {
        await db.user.update({
            where:{clerkUserId:user.id},
            data:{
                role,
                ...(role === "INTERVIEWER" && {
                    title,
                    company,
                    yearExp,
                    bio,
                    categories,
                }),
            },
        });
        return {success:true};
    } catch (error) {
        console.error("OnBoariding error", error);
        throw new Error("Something went wrong. Please try again.");
    }

}