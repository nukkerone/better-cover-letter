'use server'

import { betterCoverLetter, skillConjunction } from "@/model";
import OpenAI from "openai";
import { z } from "zod";
import { fromZodError } from "zod-validation-error"

type GenerateState = {
  message?: string
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
  const {jobDescription, freelancerProfile} = zodSafeParse.data; 

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const completions = await openai.completions.create({
    max_tokens: 200,
    model: "gpt-3.5-turbo-instruct",
    temperature: 0,
    prompt: `
        List skills present in the following profile
        <YourFreelancerProfile>
          ${freelancerProfile}
        </YourFreelancerProfile>
        And also list skills present in the following job description
        <JobDescription>
          ${jobDescription}
        </JobDescription>
      `
  });

  const {choices} = completions;

  const skills = await skillConjunction(choices[0].text)


  const generatedCoverLetter = await betterCoverLetter(skills, jobDescription)

  if (choices.length > 0) {
    return {
      message: generatedCoverLetter
    }
  } else {
    return {
      error: 'GPT was no able to generate a cover letter.'
    }
  }

}
