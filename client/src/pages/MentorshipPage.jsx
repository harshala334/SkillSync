import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle2, GraduationCap, BookOpen, Plus } from "lucide-react"
import { getAllMentors, registerAsMentor, connectToMentor } from "../services/mentorService";

export default function MentorshipPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({ jobTitle: '', company: '', bio: '', skills: '' });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const data = await getAllMentors();
      setMentors(data);
    } catch (err) {
      console.error("Failed to fetch mentors", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerAsMentor({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim())
      });
      alert("You are now registered as a mentor!");
      setShowRegisterForm(false);
      fetchMentors();
    } catch (err) {
      console.error(err);
      alert("Failed to register");
    }
  };

  const handleConnect = async (mentorId) => {
    const message = prompt("Send a connection request message:");
    if (!message) return;

    try {
      await connectToMentor({ mentorId, message });
      alert("Connection request sent!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to connect");
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading mentors...</div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Mentorship <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Find a mentor to guide your journey or become a mentor to help others grow.
          </p>
        </div>

        {/* Register Mentor Section */}
        <Card className="border-l-4 border-l-primary shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="bg-primary/10 p-4 rounded-full">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold font-heading">Become a Mentor</h2>
                <p className="text-muted-foreground mt-1">Share your knowledge and help others succeed.</p>
              </div>
            </div>
            <Button
              onClick={() => setShowRegisterForm(!showRegisterForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2 shadow-lg shadow-primary/20"
            >
              {showRegisterForm ? 'Cancel' : 'Register / Edit Profile'}
            </Button>
          </CardContent>

          {showRegisterForm && (
            <div className="p-6 pt-0 border-t border-border mt-4">
              <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
                <Input
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                  required
                />
                <Input
                  placeholder="Company"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  required
                />
                <Input
                  placeholder="Skills (comma separated)"
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Bio / Mentorship Focus"
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  required
                />
                <Button type="submit" className="w-full">Save Profile</Button>
              </form>
            </div>
          )}
        </Card>

        {/* Mentors Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-heading">Available Mentors</h3>
          </div>

          {mentors.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">No mentors available yet. Be the first one!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map(mentor => (
                <Card key={mentor._id} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="relative mb-4">
                      <img
                        src={mentor.portfolio && mentor.portfolio.includes('http') ? mentor.portfolio : `https://ui-avatars.com/api/?name=${mentor.name}&background=random`}
                        alt={mentor.name}
                        className="rounded-full w-24 h-24 border-4 border-background shadow-sm group-hover:scale-105 transition-transform"
                      />
                      <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        {mentor.jobTitle || 'Mentor'}
                      </Badge>
                    </div>

                    <h4 className="text-xl font-bold mb-1">{mentor.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{mentor.company}</p>

                    <div className="flex flex-wrap justify-center gap-1.5 mt-1 mb-6">
                      {mentor.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-secondary/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleConnect(mentor._id)}
                      className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors rounded-xl"
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Mentees Section - Temporarily Hidden until backend support */}
        {/* <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold font-heading">Available Mentees</h3>
          </div>
          ...
        </section> */}
      </div>
    </div>
  )
}
