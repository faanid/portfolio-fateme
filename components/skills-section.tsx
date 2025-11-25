"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  Code,
  Palette,
  Database,
  Wrench,
  Layers,
  Smartphone,
  Star,
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon_name: string | null;
  created_at: string;
}

const categoryIcons = {
  frontend: Code,
  backend: Database,
  "state-management": Layers,
  design: Palette,
  tools: Wrench,
  mobile: Smartphone,
};

const categoryColors = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  "state-management": "from-purple-500 to-violet-500",
  design: "from-pink-500 to-rose-500",
  tools: "from-orange-500 to-amber-500",
  mobile: "from-indigo-500 to-blue-500",
};

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("skills")
        .select("*")
console.log("data is: ",data);
      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "all",
    ...Array.from(new Set(skills.map((skill) => skill.category))),
  ];
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 5) return "Expert";
    if (proficiency >= 4) return "Advanced";
    if (proficiency >= 3) return "Intermediate";
    if (proficiency >= 2) return "Beginner";
    return "Learning";
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 5) return "text-green-600 dark:text-green-400";
    if (proficiency >= 4) return "text-blue-600 dark:text-blue-400";
    if (proficiency >= 3) return "text-purple-600 dark:text-purple-400";
    if (proficiency >= 2) return "text-orange-600 dark:text-orange-400";
    return "text-gray-600 dark:text-gray-400";
  };

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Skills
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="gradient-text">Expertise</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg p-6">
                  <div className="bg-muted-foreground/20 rounded h-4 w-3/4 mb-4"></div>
                  <div className="bg-muted-foreground/20 rounded h-2 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  console.log(groupedSkills);
  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-background to-purple-50/30 dark:to-purple-950/10"
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
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Here are the technologies and tools I work with professionally. My
            expertise spans from frontend frameworks to state management, with
            hands-on experience in building real-world applications.
          </p>
        </motion.div>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className=" h-auto grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-8">
            <TabsTrigger value="all">All Skills</TabsTrigger>
            {Object.keys(groupedSkills).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                
                {category.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const IconComponent =
                categoryIcons[category as keyof typeof categoryIcons] || Code;
              const colorClass =
                categoryColors[category as keyof typeof categoryColors] ||
                "from-gray-500 to-gray-600";

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${colorClass}`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold capitalize">
                      {category.replace("-", " ")}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{skill.name}</h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < skill.proficiency
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Proficiency
                                </span>
                                <span
                                  className={`font-medium ${getProficiencyColor(skill.proficiency)}`}
                                >
                                  {getProficiencyLabel(skill.proficiency)}
                                </span>
                              </div>
                              <Progress
                                value={skill.proficiency * 20}
                                className="h-2"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </TabsContent>

          {Object.keys(groupedSkills).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedSkills[category].map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">
                            {skill.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < skill.proficiency
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Level</span>
                            <span
                              className={`font-medium ${getProficiencyColor(skill.proficiency)}`}
                            >
                              {getProficiencyLabel(skill.proficiency)}
                            </span>
                          </div>
                          <Progress
                            value={skill.proficiency * 20}
                            className="h-3"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
