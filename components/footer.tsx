import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Email", href: "mailto:contact@example.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container max-w-screen-2xl py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Sarah Dev
              </span>
            </div>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with <Heart className="inline h-4 w-4 text-red-500" /> using Next.js, TypeScript & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center space-x-1">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild className="h-9 w-9">
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sarah Dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
