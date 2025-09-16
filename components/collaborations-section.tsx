"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Building, Clock, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface Collaboration {
  id: string;
  company_name: string;
  role: string;
  description: string;
  duration: string | null;
  technologies: string[];
  image_url: string | null;
  website_url: string | null;
  created_at: string;
}

export function CollaborationsSection() {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("collaborations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCollaborations(data || []);
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="collaborations" className="py-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Collaborations
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Professional <span className="gradient-text">Experience</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg p-6">
                  <div className="bg-muted-foreground/20 rounded h-6 w-3/4 mb-4"></div>
                  <div className="bg-muted-foreground/20 rounded h-4 w-1/2 mb-4"></div>
                  <div className="bg-muted-foreground/20 rounded h-4 w-full mb-2"></div>
                  <div className="bg-muted-foreground/20 rounded h-4 w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="collaborations"
      className="py-20 bg-gradient-to-b from-purple-50/30 to-background dark:from-purple-950/10 dark:to-background"
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
            Collaborations
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            I've had the privilege of working with amazing companies and teams.
            Here are some of the collaborations that have shaped my professional
            journey.
          </p>
        </motion.div>

        {collaborations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              Collaboration details will be updated soon.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {collaborations.map((collaboration, index) => (
              <motion.div
                key={collaboration.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {collaboration.image_url && (
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={collaboration.image_url || "/placeholder.svg"}
                        alt={collaboration.company_name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">
                          {collaboration.company_name}
                        </h3>
                      </div>
                    </div>
                  )}

                  <CardContent className="p-6">
                    {!collaboration.image_url && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">
                            {collaboration.company_name}
                          </h3>
                          <p className="text-muted-foreground">
                            {collaboration.role}
                          </p>
                        </div>
                      </div>
                    )}

                    {collaboration.image_url && (
                      <div className="mb-4">
                        <Badge variant="outline" className="mb-2">
                          {collaboration.role}
                        </Badge>
                      </div>
                    )}

                    {collaboration.duration && (
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {collaboration.duration}
                      </div>
                    )}

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {collaboration.description}
                    </p>

                    {collaboration.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {collaboration.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {collaboration.website_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full bg-transparent"
                      >
                        <Link
                          href={collaboration.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Interested in collaborating? I'm always open to new opportunities
            and exciting projects.
          </p>
          <Button size="lg" asChild>
            <Link href="#contact">Let's Work Together</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
