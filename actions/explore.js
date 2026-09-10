"use server"

import { currentUser } from "@clerk/nextjs/server";
import { select } from "motion/react-client"
import { db } from "@/lib/prisma";

export const getInterviewers = async () =>{
    const user = await currentUser();
    try {
        const interviewers = await db.user.findMany({
            where:{role:"INTERVIEWER",
                ...(user && {clerkUserId: {not:user.id}}),
            },
            select:{
                id:true,
                name:true,
                imageUrl:true,
                title:true,
                company:true,
                yearExp:true,
                bio:true,
                categories:true,
                creditRate:true,
                availabilities:{
                    where:{status:"AVAILABLE"},
                    select:{startTime:true,endTime:true},
                    take:1,
                },
            },
            orderBy:{createdAt:"desc"},
        });
        return interviewers;
    } catch (error) {
        console.error("getInterviewers error",error)
        return [];
    }
};