import { CheckCircle2, Search, Settings2 } from "lucide-react"

const steps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Select Technologies",
    description: "Choose from 500+ programming languages, frameworks, and tools."
  },
  {
    icon: <Settings2 className="h-6 w-6" />,
    title: "Generate File",
    description: "Our system will create a customized .gitignore file for your stack."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Download & Use",
    description: "Download the file and add it to your project's root directory."
  }
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Generate your .gitignore file in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="relative">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-border -translate-y-1/2" />
                )}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 