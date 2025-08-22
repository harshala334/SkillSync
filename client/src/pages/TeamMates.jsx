// src/pages/TeammatesPage.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";

// Dummy data: multiple projects, each with its own teammates
const projects = [
  {
    id: "p1",
    title: "AI Canteen System",
    description:
      "Smart menu, order predictions, and feedback analysis using NLP & dashboards.",
    teammates: [
      {
        id: "u1",
        name: "Aarav Patel",
        role: "Frontend Developer",
        avatar: "https://ui-avatars.com/api/?name=Aarav+Patel",
      },
      {
        id: "u2",
        name: "Meera Joshi",
        role: "ML Engineer",
        avatar: "https://ui-avatars.com/api/?name=Meera+Joshi",
      },
      {
        id: "u3",
        name: "Rohit Mehta",
        role: "Designer",
        avatar: "https://ui-avatars.com/api/?name=Rohit+Mehta",
      },
    ],
  },
  {
    id: "p2",
    title: "Alumni Connect Platform",
    description:
      "Mentorship matching, events, and verified achievements for campus alumni.",
    teammates: [
      {
        id: "u4",
        name: "Riya Sharma",
        role: "UI/UX Designer",
        avatar: "https://ui-avatars.com/api/?name=Riya+Sharma",
      },
      {
        id: "u5",
        name: "Arjun Verma",
        role: "Backend Engineer",
        avatar: "https://ui-avatars.com/api/?name=Arjun+Verma",
      },
    ],
  },
  {
    id: "p3",
    title: "Smart City Portal",
    description:
      "Citizen reports, analytics, and open data visualizations for local services.",
    teammates: [
      {
        id: "u6",
        name: "Kabir Singh",
        role: "Backend Engineer",
        avatar: "https://ui-avatars.com/api/?name=Kabir+Singh",
      },
      {
        id: "u7",
        name: "Simran Kaur",
        role: "Data Analyst",
        avatar: "https://ui-avatars.com/api/?name=Simran+Kaur",
      },
      {
        id: "u8",
        name: "Aditya Rao",
        role: "Full-Stack Dev",
        avatar: "https://ui-avatars.com/api/?name=Aditya+Rao",
      },
    ],
  },
];

export default function TeamMates() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {projects.map((project) => (
          <section key={project.id} className="space-y-4">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {project.title}
                </h2>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
              <Button className="self-start sm:self-auto">
                <Users className="w-4 h-4 mr-2" />
                Join Project
              </Button>
            </div>

            {/* Teammates grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.teammates.map((mate) => (
                <Card
                  key={mate.id}
                  className="rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <CardHeader className="flex items-center gap-4">
                    <img
                      src={mate.avatar}
                      alt={mate.name}
                      className="w-14 h-14 rounded-full border border-gray-200"
                    />
                    <div>
                      <CardTitle className="leading-tight">
                        {mate.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{mate.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
