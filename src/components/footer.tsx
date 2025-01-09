import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 p-4 md:flex-row ">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:px-0 w-full">
          <p className="text-center text-sm leading-loose text-muted-foreground w-full">
            Built by{" "}
            <Link
              href="https://github.com/Haseeb-WebDeveloper"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Haseeb Ahmed Raza Khan
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
} 