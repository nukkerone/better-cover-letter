'use client'

import GenerationForm from "@/components/generate/form"
import Response from "@/components/generate/response"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Separator } from "../ui/separator"

type Generation = {
  skills: string[],
  coverLetter: string
}

export default function Generate() {
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<Generation>({ skills: [], coverLetter: '' })
  const [error, setError] = useState<string>('')

  return (
    <>
      <Card className="flex flex-1 flex-col">
        <CardHeader className="border-b-[1px]">
          <CardTitle>Generate Your Smart Cover Letter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <GenerationForm onGeneration={(coverLetter: string, skills: string[]) => setGeneratedCoverLetter({ coverLetter, skills })} onError={setError} />
        </CardContent>
      </Card>

      <Response className="flex-1" response={generatedCoverLetter.coverLetter ?? error} skills={generatedCoverLetter.skills} />
    </>
  )
}
