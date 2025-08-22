import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, KanbanSquare, FileText, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "AI-Powered Teammate Matcher",
    description:
      "Smart matchmaking system that connects you with peers based on skills, goals, and availability.",
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    status: "Live",
  },
  {
    title: "Project Board (Trello-lite)",
    description:
      "Kanban-style boards to plan, assign roles, and track project progress in real-time.",
    icon: <KanbanSquare className="w-6 h-6 text-indigo-600" />,
    status: "In Progress",
  },
  {
    title: "Smart Resume / Portfolio Builder",
    description:
      "Generate beautiful resumes and portfolios synced with your GitHub and AI-enhanced descriptions.",
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    status: "Planned",
  },
  {
    title: "GenAI Skill Coach",
    description:
      "AI-generated roadmaps with curated resources, weekly plans, and suggested projects to build.",
    icon: <Rocket className="w-6 h-6 text-indigo-600" />,
    status: "Live",
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16 px-6 lg:px-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Our Projects
        </h2>
        <p className="text-lg text-gray-600">
          Explore the core modules of <span className="font-semibold">SkillSync</span>, 
          built to help students <span className="text-indigo-600">collaborate, learn, and grow</span>.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className="shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-indigo-50">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-600 flex-1">{project.description}</p>
                <div className="mt-6 flex justify-between items-center">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      project.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : project.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {project.status}
                  </span>
                  <Link to="/explore">
  <button className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 transition">
    Explore
  </button>
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
