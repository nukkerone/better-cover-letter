'use server'

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
    max_tokens: 350,
    model: "gpt-3.5-turbo-instruct",
    prompt: `
        You are a professional HR manager, your job is, based on a job description and a freelancer profile, to create the best possible cover letter for him. 
        You will do this by analyzing the job description matching it with the freelancer profile and then generating a cover letter. 
        If the freelancer profile does not meet all the requirements, you should avoid mentioning, and instead focus on the skills that the freelancer has that are relevant to the job description.
        Following is a job description and a freelancer profile.
        <JobDescription>
          ${jobDescription}
        </JobDescription>
        <freelancerProfile>
          ${freelancerProfile}
        </freelancerProfile>
        Please, format your output using html, for example making use of the paragraph tags.
      `
  });

  const {choices} = completions;

  if (choices.length > 0) {
    return {
      message: choices[0].text
    }
  } else {
    return {
      error: 'GPT was no able to generate a cover letter.'
    }
  }

}
