import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CallToActionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

const CallToAction = ({ title, description, buttonText, buttonLink }: CallToActionProps) => {
  return (
    <section className="py-16 bg-emerald-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-emerald-100 max-w-2xl mx-auto mb-8">{description}</p>
        <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}

export default CallToAction;
