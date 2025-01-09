import Link from "next/link"
import { Github, Mail, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container padding mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <Image 
              src="/gitignoreio-logo.svg" 
              alt="Logo" 
              width={100} 
              height={100} 
              className="w-8 h-8" 
            />
            <span className="font-semibold hidden md:inline-block">
              Gitignore Generator
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Contact Developer</span>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
} 