import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, KanbanSquare, FileText, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "AI-Powered Teammate Matcher",
    description:
      "Smart matchmaking system that connects you with peers based on skills, goals, and availability.",
    icon: <Users className="w-6 h-6" />,
    status: "Live",
    link: "/teammates"
  },
  {
    title: "Project Board (Trello-lite)",
    description:
      "Kanban-style boards to plan, assign roles, and track project progress in real-time.",
    icon: <KanbanSquare className="w-6 h-6" />,
    status: "In Progress",
    link: "/projects"
  },
  {
    title: "Smart Resume / Portfolio Builder",
    description:
      "Generate beautiful resumes and portfolios synced with your GitHub and AI-enhanced descriptions.",
    icon: <FileText className="w-6 h-6" />,
    status: "Planned",
    link: "/profile"
  },
  {
    title: "GenAI Skill Coach",
    description:
      "AI-generated roadmaps with curated resources, weekly plans, and suggested projects to build.",
    icon: <Rocket className="w-6 h-6" />,
    status: "Live",
    link: "/skill-coach"
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-background min-h-screen pt-24 pb-16 px-6 lg:px-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
          🚀 Our <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Explore the core modules of <span className="font-semibold text-foreground">SkillSync</span>,
          built to help students <span className="text-primary font-medium">collaborate, learn, and grow</span>.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className="group h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {project.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${project.status === "Live"
                        ? "bg-green-500/10 text-green-600 border-green-200"
                        : project.status === "In Progress"
                          ? "bg-yellow-500/10 text-yellow-600 border-yellow-200"
                          : "bg-gray-500/10 text-gray-600 border-gray-200"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <Link to={project.link} className="w-full">
                    <Button className="w-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground text-foreground transition-all duration-300 group/btn justify-between rounded-xl">
                      Explore Module
                      <ArrowRight className="w-4 h-4 opacity-50 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
