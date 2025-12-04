// src/pages/TeammatesPage.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, ArrowRight } from "lucide-react";

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
        avatar: "https://ui-avatars.com/api/?name=Aarav+Patel&background=random",
      },
      {
        id: "u2",
        name: "Meera Joshi",
        role: "ML Engineer",
        avatar: "https://ui-avatars.com/api/?name=Meera+Joshi&background=random",
      },
      {
        id: "u3",
        name: "Rohit Mehta",
        role: "Designer",
        avatar: "https://ui-avatars.com/api/?name=Rohit+Mehta&background=random",
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
        avatar: "https://ui-avatars.com/api/?name=Riya+Sharma&background=random",
      },
      {
        id: "u5",
        name: "Arjun Verma",
        role: "Backend Engineer",
        avatar: "https://ui-avatars.com/api/?name=Arjun+Verma&background=random",
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
        avatar: "https://ui-avatars.com/api/?name=Kabir+Singh&background=random",
      },
      {
        id: "u7",
        name: "Simran Kaur",
        role: "Data Analyst",
        avatar: "https://ui-avatars.com/api/?name=Simran+Kaur&background=random",
      },
      {
        id: "u8",
        name: "Aditya Rao",
        role: "Full-Stack Dev",
        avatar: "https://ui-avatars.com/api/?name=Aditya+Rao&background=random",
      },
    ],
  },
];

export default function TeamMates() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-heading font-bold text-foreground">
            Find Your <span className="text-gradient">Dream Team</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with skilled peers, join exciting projects, and build something amazing together.
          </p>
        </div>

        {projects.map((project) => (
          <section key={project.id} className="space-y-6">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {project.title}
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">Active</span>
                </h2>
                <p className="text-muted-foreground mt-1 max-w-2xl">{project.description}</p>
              </div>
              <Button className="self-start sm:self-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl">
                <Users className="w-4 h-4 mr-2" />
                Join Project
              </Button>
            </div>

            {/* Teammates grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {project.teammates.map((mate) => (
                <Card
                  key={mate.id}
                  className="group relative overflow-hidden rounded-2xl border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="relative">
                      <img
                        src={mate.avatar}
                        alt={mate.name}
                        className="w-12 h-12 rounded-full border-2 border-background shadow-sm group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold leading-tight">
                        {mate.name}
                      </CardTitle>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{mate.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full justify-between group/btn hover:border-primary hover:text-primary transition-colors rounded-xl">
                      <span className="flex items-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
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
