"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/context"

const stats = [
  { key: "experience", value: "3+" },
  { key: "projects", value: "8+" },
  { key: "companies", value: "3" },
  { key: "technologies", value: "25+" },
]

const socialLinks = [
  { name: "GitHub", href: "https://github.com/fateme-kharazmi", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/fateme-kharazmi", icon: Linkedin },
  { name: "Email", href: "mailto:fatemeekharazmi@gmail.com", icon: Mail },
]

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-purple-950/20 dark:via-gray-900 dark:to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 max-w-screen-xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="secondary" className="mb-4">
                {t("hero.greeting")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-balance"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Fateme Kharazmi
              </span>
              <br />
              Front-End Developer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty"
            >
              Building responsive and performant web applications with React.js, Next.js, and TypeScript
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl text-pretty"
            >
              Front-End Developer with hands-on experience in React.js, Next.js, and TypeScript. Skilled in building
              responsive UI with Tailwind CSS and Material UI, and familiar with state management using Redux, RTK, and
              Zustand. Passionate about learning new technologies and improving front-end performance in real-world
              projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button size="lg" asChild>
                <Link href="#projects">
                  {t("hero.cta.viewWork")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">
                  {t("hero.cta.getInTouch")}
                  <Mail className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4 mb-12"
            >
              {socialLinks.map((link) => (
                <Button key={link.name} variant="ghost" size="icon" asChild className="h-12 w-12">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </Button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">{stat.key}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full blur-3xl opacity-20"></div>
              <img
                src="/professional-female-developer.png"
                alt="Fateme Kharazmi"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
