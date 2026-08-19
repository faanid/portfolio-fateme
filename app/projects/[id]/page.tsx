import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { ProjectComments } from "@/components/projects/project-comments";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export const dynamicParams = false;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {project.featured && (
              <Badge className="bg-coffee-600 hover:bg-coffee-700">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(project.created_at)}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <Tag className="h-4 w-4 text-muted-foreground mr-2" />
            {project.technologies.map((tech: string) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.live_url && (
              <Button asChild>
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.github_url && (
              <Button variant="outline" asChild>
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>
        <Card className="mb-8 overflow-hidden">
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </Card>
        {project.long_description && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {project.long_description}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.technologies.map((tech: string) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 p-3 bg-muted rounded-lg"
                >
                  <div className="h-2 w-2 bg-coffee-600 rounded-full"></div>
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ProjectComments projectId={project.id} projectTitle={project.title} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Fateme Portfolio`,
    description: project.description,
  };
}
