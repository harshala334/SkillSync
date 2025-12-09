// src/pages/TeammatesPage.jsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, UserPlus, ArrowRight, Plus } from "lucide-react";
import { getAllProjects, joinProject, createProject } from "../services/projectService";

export default function TeamMates() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create Project State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', techStack: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (projectId) => {
    try {
      await joinProject(projectId);
      alert("Successfully joined the project!");
      fetchProjects(); // Refresh list to show updated members
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to join project");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      alert("Project created successfully!");
      setNewProject({ title: '', description: '', techStack: '' });
      setShowCreateForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  if (loading) return <div className="text-center pt-24 text-foreground">Loading projects...</div>;
  if (error) return <div className="text-center pt-24 text-red-500">{error}</div>;

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
          <Button onClick={() => setShowCreateForm(!showCreateForm)} variant="outline" className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            {showCreateForm ? 'Cancel' : 'Create New Project'}
          </Button>
        </div>

        {/* Create Project Form */}
        {showCreateForm && (
          <Card className="max-w-lg mx-auto border-primary/20 bg-secondary/10">
            <CardHeader>
              <CardTitle>Create a New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <Input
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Short Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    placeholder="Tech Stack (comma separated)"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">Create Project</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {projects.length === 0 && !showCreateForm ? (
          <div className="text-center text-muted-foreground">No projects found. Create one to get started!</div>
        ) : (
          projects.map((project) => (
            <section key={project._id} className="space-y-6">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {project.title}
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">Active</span>
                  </h2>
                  <p className="text-muted-foreground mt-1 max-w-2xl">{project.description}</p>
                </div>
                <Button
                  onClick={() => handleJoin(project._id)}
                  className="self-start sm:self-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Project
                </Button>
              </div>

              {/* Teammates grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {project.members && project.members.map((mate) => (
                  <Card
                    key={mate._id}
                    className="group relative overflow-hidden rounded-2xl border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="relative">
                        <img
                          src={mate.avatar || `https://ui-avatars.com/api/?name=${mate.name}&background=random`}
                          alt={mate.name}
                          className="w-12 h-12 rounded-full border-2 border-background shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold leading-tight">
                          {mate.name}
                        </CardTitle>
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">{mate.email}</p>
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
          ))
        )}
      </div>
    </div>
  );
}
