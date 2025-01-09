import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is a .gitignore file?",
    answer: "A .gitignore file tells Git which files or folders to ignore in a project. It's usually used to avoid committing transient files from your working directory that aren't useful for other collaborators."
  },
  {
    question: "How do I use the generated .gitignore file?",
    answer: "Simply download the generated file and place it in your project's root directory. Name it exactly '.gitignore' (including the dot at the start). Git will automatically use it to determine which files to ignore."
  },
  {
    question: "Can I combine multiple templates?",
    answer: "Yes! You can select multiple languages and frameworks, and our generator will combine their templates into a single .gitignore file, removing any duplicates."
  },
  {
    question: "Are the templates up to date?",
    answer: "Yes, we fetch templates directly from gitignore.io, which maintains an up-to-date collection of templates for various programming languages and development tools."
  }
]

export function FAQ() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Common questions about .gitignore files and our generator
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 