'use client'

import GenerationForm from "@/components/generate/form"
import Response from "@/components/generate/response"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function Home() {
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string>('')
  const [error, setError] = useState<string>('')

  return (
    <main className="flex min-h-screen flex-row items-stretch justify-between p-24 max-w-[1280px] gap-[24px]">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Generate Your Smart Cover Letter</CardTitle>
        </CardHeader>
        <CardContent>
          <GenerationForm onGeneration={setGeneratedCoverLetter} onError={setError} />
        </CardContent>
      </Card>

      <Response className="flex-1" response={generatedCoverLetter ?? error} />
    </main>
  )
}
