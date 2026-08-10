"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ProjectCommentsProps {
  projectId: string;
  projectTitle?: string;
}

export function ProjectComments({
  projectId,
  projectTitle,
}: ProjectCommentsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/project-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          project_title: projectTitle,
          name: formData.name,
          email: formData.email,
          comment: formData.comment,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      setFormData({ name: "", email: "", comment: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to send your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Leave a Comment
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200">
              Thanks! Your comment has been sent.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="comment">Comment *</Label>
            <Textarea
              id="comment"
              rows={4}
              value={formData.comment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Share your thoughts about this project..."
              required
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto"
          >
            {submitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Comment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
