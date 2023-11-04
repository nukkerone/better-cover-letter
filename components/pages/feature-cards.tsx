import Image from "next/image"
import HeadingText from "@/components/heading-text"
import { featureCards } from "@/config/contents"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

export default function FeatureCards() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <div className="container space-y-8 py-12 text-center lg:py-20">
        {featureCards.header || featureCards.subheader ? (
          <HeadingText subtext={featureCards.subheader}>
            {featureCards.header}
          </HeadingText>
        ) : null}
        <div className="flex gap-4 justify-center">
          {featureCards.content.map((cards: any) => (
            <Card
              key={cards.text}
              className="flex-1 flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary max-w-[300px]"
            >
              {cards.image !== "" ? (
                <div className="flex items-center justify-center">
                  <div className="flex flex-1 bg-white">
                    <Image
                      src={cards.image}
                      width={100}
                      height={100}
                      alt="Card image"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="space-y-2">
                <CardTitle>{cards.text}</CardTitle>
                <CardDescription>{cards.subtext}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
