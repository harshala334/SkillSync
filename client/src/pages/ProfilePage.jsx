import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Github, Mail, Linkedin, Edit3, Trophy, Code2, Briefcase } from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

export default function ProfilePage() {
  const data = [
    { skill: "React", level: 80 },
    { skill: "Node.js", level: 70 },
    { skill: "MongoDB", level: 65 },
    { skill: "TailwindCSS", level: 75 },
    { skill: "Python", level: 60 },
  ]

  return (
    <div className="min-h-screen bg-background py-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="rounded-3xl shadow-xl overflow-hidden border-none bg-card/50 backdrop-blur-sm">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20" />
            <CardContent className="relative px-8 pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
                <div className="relative">
                  <img
                    src="https://avatars.githubusercontent.com/u/000000?v=4"
                    alt="profile"
                    className="w-32 h-32 rounded-full border-4 border-background shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </div>

                <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                  <h1 className="text-3xl font-heading font-bold text-foreground">Harshala Mahajan</h1>
                  <p className="text-muted-foreground font-medium">Full-Stack Developer | AI Enthusiast</p>
                  <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                    <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:text-blue-600 hover:border-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:text-red-500 hover:border-red-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 mb-2">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Skills Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="rounded-2xl shadow-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Code2 className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold font-heading">Technical Skills</h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "MongoDB", "TailwindCSS", "Python", "TypeScript", "Docker"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-secondary/50 hover:bg-secondary transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Overall Proficiency</span>
                      <span className="text-primary">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Card className="rounded-2xl shadow-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold font-heading">Featured Projects</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="group p-5 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Real Estate Platform</h3>
                      <p className="text-sm text-muted-foreground mt-1">MERN stack app with map integration & advanced filters</p>
                    </div>
                    <div className="group p-5 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Canteen Website</h3>
                      <p className="text-sm text-muted-foreground mt-1">Smart menu ordering system with ratings & reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skill Radar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Card className="rounded-2xl shadow-md border-border/50 bg-card/50 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold font-heading mb-4 text-center">Skill Radar</h2>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer>
                      <RadarChart data={data} outerRadius="70%">
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name="Skill Level"
                          dataKey="level"
                          stroke="var(--primary)"
                          fill="var(--primary)"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Card className="rounded-2xl shadow-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-bold font-heading">Achievements</h2>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Runner-up in Inter-college Kho-Kho",
                      "District-level Drama Competition Winner",
                      "Reliance Foundation Scholar"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
