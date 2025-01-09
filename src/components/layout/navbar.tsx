import Link from "next/link"
import { Github, Mail, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { EMAIL } from "@/constant/constant"

// Move ModeToggle to a client component
const ModeToggle = dynamic(
  () => import('@/components/ui/mode-toggle').then(mod => mod.ModeToggle),
  {
    loading: () => <div className="w-9 h-9" /> // Placeholder
  }
)

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container padding mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            aria-label="Home"
            className="flex items-center space-x-2 "
          >
            <Image 
              src="/logo.png" 
              alt="gitignore-generator-logo" 
              width={100} 
              height={100} 
              className="w-32 h-32 mt-2" 
              priority
              loading="eager"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Contact Developer" size="sm" className="h-9 flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <Link href={`mailto:${EMAIL}`} target="_blank" rel="noreferrer" aria-label="Contact Developer">
                  <span className="hidden md:inline">Contact Developer</span>
                </Link>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
} 