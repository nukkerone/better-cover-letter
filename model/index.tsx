import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export type SkillListStruct = {
  freelancerSkills: string[],
  jobDescriptionSkills: string[]
}

export const getSkillList = async (freelancerProfile: string, jobDescription: string): Promise<SkillListStruct> => {
  const prompt = `
  List skills present in the following profile
  <YourFreelancerProfile>
    ${freelancerProfile}
  </YourFreelancerProfile>
  And also list skills present in the following job description
  <JobDescription>
    ${jobDescription}
  </JobDescription>
  Return the skils in the following json format:
  {
    "freelancerSkills": [
      "skill1",
      "skill2",
      "skill3"
    ],
    "jobDescriptionSkills": [
      "skill4",
      "skill5",
      "skill6"
    ]
  }
`
  const result = await getOpenAIResponse(prompt)
  const parsedJson = JSON.parse(result) as SkillListStruct
  return parsedJson;
}

export type PresentSkillListStruct = {
  freelancerSkillsThatMeetJobPosting: string[]
}


export const getFreelancerPresentSkills = async (freelancerProfile: string, jobDescription: string): Promise<PresentSkillListStruct> => {

  const prompt = `
    Given the the skills present in the following profile:
    <freelancerProfile>
      ${freelancerProfile}
    </freelancerProfile>
    And also the skills required in the following job description:
    <jobDescription>
      ${jobDescription}
    </jobDescription>
    Generate a list of skills that the freelancer meets the requirements for the job description, in the following json format, filter out skills not present in the freelancer profile:
    {
      "freelancerSkillsThatMeetJobPosting: [
        "skill1",
        "skill2",
        "skill3"
      ]
    }
  `
  const result = await getOpenAIResponse(prompt)

  return JSON.parse(result) as PresentSkillListStruct;
}

export const skillConjunction = async (skills: string) => {

  const prompt = `
    Given the following two set of skills, generate a new set that is the difference between the two:
    ${skills}
  `

  const result = await getOpenAIResponse(prompt)
  return result;
}

export const betterCoverLetterFromJobPosting = async (skills: string, originalCoverLetter: string) => {

  const prompt = `
    Given the following job posting:
    <jobPosting>
      ${originalCoverLetter}
    </jobPosting>
    Generate a job application, excluding following listed skills, do not mention them AT ALL!:
    <listOfSkills>
      ${skills}
    </listOfSkills>
  `
  const result = await getOpenAIResponse(prompt)
  return result;
}

export const betterCoverLetterFromFreelancerProfile = async (skills: string, originalCoverLetter: string) => {
  const prompt = `
    Given the following skils:
    <skills>
      ${skills}
    </skills>
    Rewrite the following cover letter to only include the skills listed above:
    <coverLetter>
      ${originalCoverLetter}
    </coverLetter>
  `
  const result = await getOpenAIResponse(prompt)

  return result;
}

export const getOpenAIResponse = async (prompt: string): Promise<string> => {
  const completions = await openai.completions.create({
    max_tokens: 400,
    model: "gpt-3.5-turbo-instruct",
    temperature: 0,
    prompt
  });

  const { choices } = completions
  return choices[0].text;
}