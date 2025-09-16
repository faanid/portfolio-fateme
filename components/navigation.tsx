"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Github, Linkedin, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Email", href: "mailto:contact@example.com", icon: Mail },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useI18n();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.collaborations"), href: "#collaborations" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Sarah Dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                pathname === item.href
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-1">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9"
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>

          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                      pathname === item.href
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex items-center space-x-2 pt-4 border-t">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.name}
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-9 w-9"
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.name}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
