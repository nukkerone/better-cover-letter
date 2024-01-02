'use client'

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

type Props = {
  className?: string,
  response: string
  skills: string[]
}

const Response = ({ className = '', response = '', skills = [] }: Props) => {

  return <Card className={cn(className, 'overflow-auto')}>
    <CardHeader className="border-b-[1px]">
      <CardTitle>Generated Cover Letter</CardTitle>
    </CardHeader>
    <CardContent>
      { skills && skills.length > 0 && <Skills skills={skills} />}
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

const Skills = ({ skills }: { skills: string[] }) => {
  return skills && skills.length > 0 && <div className="flex flex-wrap gap-2 my-4">
    {skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
  </div>
}