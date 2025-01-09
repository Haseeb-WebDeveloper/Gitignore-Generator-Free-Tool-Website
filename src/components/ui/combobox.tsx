"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

interface Language {
  value: string
  label: string
}

const languages: Language[] = [
  { value: "node", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "cpp", label: "C++" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "flutter", label: "Flutter" },
  { value: "django", label: "Django" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "typescript", label: "TypeScript" },
  { value: "dart", label: "Dart" },
  { value: "scala", label: "Scala" },
  { value: "unity", label: "Unity" },
]

export function LanguageCombobox({ 
  selectedLanguages, 
  onSelect 
}: { 
  selectedLanguages: string[]
  onSelect: (value: string) => void 
}) {
  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search languages..." 
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <CommandEmpty>No language found.</CommandEmpty>
        <CommandGroup className="max-h-[200px] overflow-y-auto p-1">
          {languages.map((language) => (
            <CommandItem
              key={language.value}
              value={language.value}
              onSelect={() => onSelect(language.value)}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer aria-selected:bg-accent"
            >
              <div className="flex h-4 w-4 items-center justify-center">
                {selectedLanguages.includes(language.value) && (
                  <Check className="h-4 w-4" />
                )}
              </div>
              <span>{language.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>

      {selectedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedLanguages.map((lang) => {
            const language = languages.find(l => l.value === lang)
            return (
              <span
                key={lang}
                className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
              >
                {language?.label || lang}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
} 