import { Code2, Download, Globe2, Zap } from "lucide-react"

const features = [
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: "500+ Languages & Frameworks",
    description: "Support for all major programming languages, frameworks, and development tools."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Generation",
    description: "Generate your .gitignore file in seconds with just a few clicks."
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Customizable Templates",
    description: "Mix and match templates for different technologies in one .gitignore file."
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Easy Download",
    description: "Download your generated .gitignore file with one click."
  }
]

export function Features() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Features
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to generate the perfect .gitignore file
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 