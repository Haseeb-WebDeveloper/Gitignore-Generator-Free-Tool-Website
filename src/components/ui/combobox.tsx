"use client"

import * as React from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command"
import { LANGUAGES } from "@/constant/constant"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ComboboxProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function Combobox({ value, onChange, disabled }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  // Get current selected languages
  const selectedLanguages = value.split(',').map(v => v.trim()).filter(Boolean)

  // Filter languages based on search
  const filteredLanguages = React.useMemo(() => {
    if (!search) return []
    const searchTerms = search.toLowerCase().split(',').map(term => term.trim())
    const lastTerm = searchTerms[searchTerms.length - 1]
    
    if (!lastTerm) return []

    return LANGUAGES
      .filter(lang => 
        lang.toLowerCase().includes(lastTerm) &&
        !selectedLanguages.includes(lang.toLowerCase()) // Don't show already selected languages
      )
      .slice(0, 5)
  }, [search, selectedLanguages])

  // Handle selection
  const handleSelect = (selectedValue: string) => {
    const newValue = selectedLanguages.length > 0 
      ? `${value}, ${selectedValue}` 
      : selectedValue

    onChange(newValue)
    setSearch("")
    setOpen(false)
  }

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => setOpen(false)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setSearch(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          disabled={disabled}
          placeholder="e.g., node, python, react"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus:border-primary/40 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      {open && filteredLanguages.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <Command className="w-full">
            <CommandGroup className="max-h-[200px] overflow-y-auto">
              {filteredLanguages.map((lang) => (
                <CommandItem
                  key={lang}
                  value={lang}
                  onSelect={handleSelect}
                  className="flex items-center gap-2 px-2 py-1.5 cursor-pointer aria-selected:bg-accent"
                >
                  <div className="flex h-4 w-4 items-center justify-center">
                    {selectedLanguages.includes(lang.toLowerCase()) && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                  <span>{lang}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {filteredLanguages.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </Command>
        </div>
      )}
    </div>
  )
}