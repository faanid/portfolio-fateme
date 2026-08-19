"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Send,
  MapPin,
  Phone,
  MessageCircle,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ProjectSubmissionData {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  project_title: string;
  project_description: string;
  budget_range: string;
  timeline: string;
  technologies: string[];
  priority: string;
}

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Let's discuss",
];

const timelineOptions = [
  "ASAP",
  "1-2 weeks",
  "1 month",
  "2-3 months",
  "3-6 months",
  "6+ months",
  "Flexible",
];

const priorityLevels = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
];

const commonTechnologies = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Material UI",
  "Redux",
  "Zustand",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Supabase",
];

export function ContactSection() {
  const [activeTab, setActiveTab] = useState("contact");
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [projectForm, setProjectForm] = useState<ProjectSubmissionData>({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    project_title: "",
    project_description: "",
    budget_range: "",
    timeline: "",
    technologies: [],
    priority: "medium",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [projectSuccess, setProjectSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const [projectError, setProjectError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setContactForm({ name: "", email: "", subject: "", message: "" });
      setContactSuccess(true);
      setTimeout(() => setContactSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setContactError("Failed to send message. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSubmitting(true);
    setProjectError("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });

      if (!response.ok) throw new Error("Failed to submit project");

      setProjectForm({
        company_name: "",
        contact_name: "",
        email: "",
        phone: "",
        project_title: "",
        project_description: "",
        budget_range: "",
        timeline: "",
        technologies: [],
        priority: "medium",
      });
      setProjectSuccess(true);
      setTimeout(() => setProjectSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting project form:", error);
      setProjectError("Failed to submit project. Please try again.");
    } finally {
      setProjectSubmitting(false);
    }
  };

  const toggleTechnology = (tech: string) => {
    setProjectForm((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  return (
    <section
      id="contact"
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
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Have a project in mind or just want to chat? I'd love to hear from
            you. Choose the option that works best for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Tehran, Iran / Remote
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Response Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  I typically respond to messages within 24 hours during
                  business days.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>General Inquiries</span>
                    <span className="text-green-600 dark:text-green-400">
                      24h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Proposals</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      48h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgent Requests</span>
                    <span className="text-orange-600 dark:text-orange-400">
                      Same day
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Forms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="contact"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  General Contact
                </TabsTrigger>
                <TabsTrigger
                  value="project"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Project Submission
                </TabsTrigger>
              </TabsList>

              {/* Contact Form */}
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Send me a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contactSuccess && (
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-800 dark:text-green-200">
                          Message sent successfully! I'll get back to you soon.
                        </p>
                      </div>
                    )}

                    {contactError && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-red-800 dark:text-red-200">
                          {contactError}
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contact-name">Name *</Label>
                          <Input
                            id="contact-name"
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-email">Email *</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="contact-subject">Subject</Label>
                        <Input
                          id="contact-subject"
                          value={contactForm.subject}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                          placeholder="What's this about?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-message">Message *</Label>
                        <Textarea
                          id="contact-message"
                          rows={6}
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          placeholder="Tell me about your project or question..."
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={contactSubmitting}
                        className="w-full"
                      >
                        {contactSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Project Submission Form */}
              <TabsContent value="project">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Project</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tell me about your project and I'll get back to you with a
                      detailed proposal.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {projectSuccess && (
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-800 dark:text-green-200">
                          Project submitted successfully! I'll review it and get
                          back to you within 48 hours.
                        </p>
                      </div>
                    )}

                    {projectError && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-red-800 dark:text-red-200">
                          {projectError}
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleProjectSubmit} className="space-y-6">
                      {/* Company & Contact Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Company & Contact Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="company-name">Company Name *</Label>
                            <Input
                              id="company-name"
                              value={projectForm.company_name}
                              onChange={(e) =>
                                setProjectForm((prev) => ({
                                  ...prev,
                                  company_name: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="contact-person">
                              Contact Person *
                            </Label>
                            <Input
                              id="contact-person"
                              value={projectForm.contact_name}
                              onChange={(e) =>
                                setProjectForm((prev) => ({
                                  ...prev,
                                  contact_name: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="project-email">Email *</Label>
                            <Input
                              id="project-email"
                              type="email"
                              value={projectForm.email}
                              onChange={(e) =>
                                setProjectForm((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="project-phone">Phone</Label>
                            <Input
                              id="project-phone"
                              value={projectForm.phone}
                              onChange={(e) =>
                                setProjectForm((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Project Details
                        </h3>
                        <div>
                          <Label htmlFor="project-title">Project Title *</Label>
                          <Input
                            id="project-title"
                            value={projectForm.project_title}
                            onChange={(e) =>
                              setProjectForm((prev) => ({
                                ...prev,
                                project_title: e.target.value,
                              }))
                            }
                            placeholder="e.g., E-commerce Website Redesign"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="project-description">
                            Project Description *
                          </Label>
                          <Textarea
                            id="project-description"
                            rows={4}
                            value={projectForm.project_description}
                            onChange={(e) =>
                              setProjectForm((prev) => ({
                                ...prev,
                                project_description: e.target.value,
                              }))
                            }
                            placeholder="Describe your project, goals, and requirements..."
                            required
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="budget-range">Budget Range</Label>
                            <Select
                              value={projectForm.budget_range}
                              onValueChange={(value) =>
                                setProjectForm((prev) => ({
                                  ...prev,
                                  budget_range: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent>
                                {budgetRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="timeline">Timeline</Label>
                            <Select
                              value={projectForm.timeline}
                              onValueChange={(value) =>
                                setProjectForm((prev) => ({
                                  ...prev,
                                  timeline: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                {timelineOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority Level</Label>
                          <Select
                            value={projectForm.priority}
                            onValueChange={(value) =>
                              setProjectForm((prev) => ({
                                ...prev,
                                priority: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityLevels.map((level) => (
                                <SelectItem
                                  key={level.value}
                                  value={level.value}
                                >
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Preferred Technologies
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Select the technologies you'd like me to use for your
                          project.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {commonTechnologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant={
                                projectForm.technologies.includes(tech)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer transition-colors"
                              onClick={() => toggleTechnology(tech)}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={projectSubmitting}
                        className="w-full"
                      >
                        {projectSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Project
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
