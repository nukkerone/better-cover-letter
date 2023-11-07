import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import Features from "@/components/pages/features"

export default async function Home() {

  return (
    <main>
      <Hero />
      <Features />
      <FeatureCards />
    </main>
  )
}
