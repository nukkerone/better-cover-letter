import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const skillConjunction = async (skills: string) => {

  const completions = await openai.completions.create({
    max_tokens: 200,
    model: "gpt-3.5-turbo-instruct",
    temperature: 0,
    prompt: `
        Given the following two set of skills, generate a new set that is the difference between the two:
        ${skills}
      `
  })

  const {choices} = completions

  return choices[0].text;
}

export const betterCoverLetter = async (skills: string, originalCoverLetter: string) => {
  
    const completions = await openai.completions.create({
      max_tokens: 200,
      model: "gpt-3.5-turbo-instruct",
      temperature: 0,
      prompt: `
          Given the following job posting:
          <jobPosting>
            ${originalCoverLetter}
          </jobPosting>
          Generate a job application, excluding following listed skills, do not mention them AT ALL!:
          <listOfSkills>
            ${skills}
          </listOfSkills>
        `
    })
  
    const {choices} = completions
  
    return choices[0].text;
}