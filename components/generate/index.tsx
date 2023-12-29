'use client'

import GenerationForm from "@/components/generate/form"
import Response from "@/components/generate/response"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function Generate() {
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string>('')
  const [error, setError] = useState<string>('')

  return (
    <>
      <Card className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>Generate Your Smart Cover Letter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <GenerationForm onGeneration={setGeneratedCoverLetter} onError={setError} />
        </CardContent>
      </Card>

      <Response className="flex-1" response={generatedCoverLetter ?? error} />
    </>
  )
}
