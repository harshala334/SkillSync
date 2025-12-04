import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCircle2, GraduationCap, BookOpen } from "lucide-react"

const mentors = [
  { id: 1, name: "Ananya Singh", role: "Mentor", skills: ["AI", "ML", "Data Science"], image: "https://ui-avatars.com/api/?name=Ananya+Singh&background=random" },
  { id: 2, name: "Rohan Mehta", role: "Mentor", skills: ["Web Dev", "MERN", "System Design"], image: "https://ui-avatars.com/api/?name=Rohan+Mehta&background=random" },
]

const mentees = [
  { id: 3, name: "Priya Sharma", role: "Mentee", skills: ["Python", "Basic ML"], goal: "Looking for AI mentorship", image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=random" },
  { id: 4, name: "Arjun Patel", role: "Mentee", skills: ["HTML/CSS", "JS"], goal: "Interested in Web Dev", image: "https://ui-avatars.com/api/?name=Arjun+Patel&background=random" },
]

export default function MentorshipPage() {
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

        {/* Pinned Profile Card */}
        <Card className="border-l-4 border-l-primary shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img src="https://ui-avatars.com/api/?name=My+Profile&background=random" alt="my-profile" className="rounded-full w-20 h-20 border-2 border-background shadow-md" />
                <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold font-heading">My Mentor Profile</h2>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <Badge variant="secondary">MERN Stack</Badge>
                  <Badge variant="secondary">AI Integration</Badge>
                  <Badge variant="secondary">Startup Guidance</Badge>
                </div>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2 shadow-lg shadow-primary/20">
              Edit Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Mentors Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-heading">Available Mentors</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <Card key={mentor.id} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative mb-4">
                    <img src={mentor.image} alt={mentor.name} className="rounded-full w-24 h-24 border-4 border-background shadow-sm group-hover:scale-105 transition-transform" />
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      {mentor.role}
                    </Badge>
                  </div>

                  <h4 className="text-xl font-bold mb-1">{mentor.name}</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 mb-6">
                    {mentor.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-secondary/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors rounded-xl">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mentees Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold font-heading">Available Mentees</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentees.map(mentee => (
              <Card key={mentee.id} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-green-500/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative mb-4">
                    <img src={mentee.image} alt={mentee.name} className="rounded-full w-24 h-24 border-4 border-background shadow-sm group-hover:scale-105 transition-transform" />
                    <Badge variant="secondary" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      {mentee.role}
                    </Badge>
                  </div>

                  <h4 className="text-xl font-bold mb-1">{mentee.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{mentee.goal}"</p>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    {mentee.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-secondary/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-secondary hover:bg-green-600 hover:text-white transition-colors rounded-xl">
                    Offer Mentorship
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
