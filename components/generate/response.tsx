'use client'

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {
  className?: string,
  response: string
}

const Response = ({ className = '', response = '' }: Props) => {

  return <Card className={cn(className)}>
    <CardHeader>
      <CardTitle>Generated Cover Letter</CardTitle>
    </CardHeader>
    <CardContent>
      { response && <div dangerouslySetInnerHTML={{__html: response}}></div> }
    </CardContent>
  </Card>
}

export default Response
