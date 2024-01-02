'use client'

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {
  className?: string,
  response: string
}

const Response = ({ className = '', response = '' }: Props) => {

  return <Card className={cn(className, 'overflow-auto')}>
    <CardHeader className="border-b-[1px]">
      <CardTitle>Generated Cover Letter</CardTitle>
    </CardHeader>
    <CardContent>
      { response && <div dangerouslySetInnerHTML={{ __html: response }}></div> }
      { !response && <DefaultResponse /> }
    </CardContent>
  </Card>
}

export default Response

const DefaultResponse = () => {
  return <p className="my-4 text-sm text-muted-foreground italic">
    Please fill out the form and click the button to generate your cover letter.
  </p>
}