'use server'

import { getFreelancerPresentSkills, betterCoverLetterFromFreelancerProfile } from "@/model";
import OpenAI from "openai";
import { z } from "zod";
import { fromZodError } from "zod-validation-error"

type GenerateState = {
  message?: string | any
  skills?: string[]
  error?: string
}

export async function generate(prevState: any, formData: FormData): Promise<GenerateState> {

  const schema = z.object({
    freelancerProfile: z.string().min(1),
    jobDescription: z.string().min(1),
  })
  const zodSafeParse = schema.safeParse({
    freelancerProfile: formData.get('freelancerProfile'),
    jobDescription: formData.get('jobDescription'),
  })

  if (!zodSafeParse.success) {
    const userFriendlyError = fromZodError(zodSafeParse.error).toString()
    return {
      error: userFriendlyError
    }
  }
  const { jobDescription, freelancerProfile } = zodSafeParse.data;

  const skills = await getFreelancerPresentSkills(freelancerProfile, jobDescription)
  
  const generatedCoverLetter = await betterCoverLetterFromFreelancerProfile(JSON.stringify(skills), freelancerProfile)

  return {
    message: generatedCoverLetter,
    skills: skills.freelancerSkillsThatMeetJobPosting
  }

}
