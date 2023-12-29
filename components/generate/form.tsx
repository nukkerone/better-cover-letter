"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
// @ts-ignore
import { useFormState, useFormStatus } from "react-dom"
import { generate } from "@/actions/form"
import { useEffect } from "react"

const formSchema = z.object({
  freelancerProfile: z.string().min(1),
  jobDescription: z.string().min(1)
})

type Props = {
  onGeneration: (generatedCoverLetter: string) => void
  onError: (error: string) => void
}

const GenerationForm = ({ onGeneration, onError } : Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      freelancerProfile: "",
      jobDescription: ""
    },
  })

  const initialState: { message?: string, error?: string } = {
    
  }
  const [state, generateFormAction] = useFormState(generate, initialState)

  useEffect(() => {
    if (state.message) {
      //form.reset()
      onGeneration(state.message)
    } else {  // If no message, then surely there's an error
      onError(state.error ?? 'An error has happened')
    }
  }, [state.message, state.error])

  return (
    <Form {...form}>
      <form action={generateFormAction} className="space-y-8 flex flex-1 flex-col">
        <FormField
          control={form.control}
          name="freelancerProfile"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col">
              <FormLabel>Freelancer Profile</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} className="flex-1" />
              </FormControl>
              <FormDescription>
                Paste your original Cover Letter or your Freelancer profile, both will work.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col">
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} className="flex-1" />
              </FormControl>
              <FormDescription>
                This is the Job Application descriptions you want to apply to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton />
      </form>
    </Form>
  )
}

export default GenerationForm

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      Generate
    </Button>
  )
}
