import { HeroHeader, ContentSection } from "@/lib/landing/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Cover Letters that Convince`,
  subheader: `You're AI driven cover letter that sounds just like you.`,
  image: `/hero-img.webp`,
}

export const featureCards: ContentSection = {
  header: `Pricing`,
  subheader: `It's free forever, just clone the project and bring your own OpenAI API key.`,
  content: [
    {
      text: `$0.00`,
      subtext: `Beware of your own OpenAI API usage!`,
      image: `/free.png`,
    },
  ],
}

export const features: ContentSection = {
  header: `How it works`,
  subheader: `Why use Next Landing?`,
  image: `/ostrich.png`,
  content: [
    {
      text: `Bring your own Cover Letter or Resume`,
      subtext: `We generate base on your writing style and structure`,
      image: '',
    },
    {
      text: `Paste your client's job description`,
      subtext: `We analyze the requirements`,
      image: '',
    },
    {
      text: `Let the AI generate the cover letter for you`,
      subtext: `We generate based on your writing style, structure and job description requirements`,
      image: '',
    },
  ],
}
