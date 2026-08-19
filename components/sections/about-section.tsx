"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Coffee,
  Heart,
  Zap,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Calendar,
    label: "Experience",
    value: "3+ Years",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tehran, Iran",
  },
  {
    icon: Coffee,
    label: "Projects",
    value: "8+ Completed",
  },
  {
    icon: Heart,
    label: "Passion",
    value: "Frontend Dev",
  },
];

const values = [
  {
    icon: Zap,
    title: "Performance First",
    description:
      "I focus on building fast, optimized applications with real-time features and efficient data flows.",
  },
  {
    icon: Target,
    title: "Detail Oriented",
    description:
      "Every component matters. I create pixel-perfect, responsive designs following design systems and best practices.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "I thrive in Agile environments, working effectively with cross-functional teams using Git workflows.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-background to-coffee-50/30 dark:to-coffee-950/10"
    >
      <div className="container max-w-screen-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Passionate about creating{" "}
            <span className="gradient-text">exceptional experiences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            I'm a dedicated frontend developer who loves turning complex
            problems into simple, beautiful, and intuitive solutions. I
            specialize in React.js, Next.js, and TypeScript with a focus on
            performance and user experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My journey into frontend development started with a strong
                foundation in Electrical Engineering from Azad University Tehran
                Central Branch. I discovered my passion for web development and
                quickly specialized in React.js and the modern JavaScript
                ecosystem.
              </p>
              <p>
                Over the past 3+ years, I've worked with companies like Nextera,
                AlborzEng Co., and Esperez Team, building everything from smart
                CCTV dashboards with real-time WebSocket integration to
                comprehensive authentication systems. I'm particularly
                passionate about performance optimization, component
                architecture, and creating reusable UI libraries.
              </p>
              <p>
                I thrive in collaborative Agile environments and am always eager
                to learn new technologies. Currently, I'm expanding my skills in
                Svelte, Vue.js, and system design while maintaining expertise in
                React.js, Next.js, and TypeScript. I'm fluent in English (C1)
                and German (B2), enabling effective communication in
                international teams.
              </p>
            </div>

            <Button asChild className="mt-6">
              <Link href="#contact">Let's Work Together</Link>
            </Button>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <item.icon className="h-8 w-8 mx-auto mb-3 text-coffee-600 dark:text-coffee-400" />
                    <div className="text-2xl font-bold mb-1">{item.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-8 w-8 mb-4 text-coffee-600 dark:text-coffee-400" />
                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
