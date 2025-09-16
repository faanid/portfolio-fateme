"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
}

interface ProjectCommentsProps {
  projectId: string;
}

export function ProjectComments({ projectId }: ProjectCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("project_comments")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) return;

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("project_comments").insert({
        project_id: projectId,
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
      });

      if (error) throw error;

      setFormData({ name: "", email: "", comment: "" });
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Comments List */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg p-4">
                  <div className="bg-muted-foreground/20 rounded h-4 w-1/4 mb-2"></div>
                  <div className="bg-muted-foreground/20 rounded h-4 w-full mb-1"></div>
                  <div className="bg-muted-foreground/20 rounded h-4 w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{comment.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
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
                "Submitting..."
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
    </div>
  );
}
