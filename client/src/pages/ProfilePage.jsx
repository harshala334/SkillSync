import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Github, Mail, Linkedin, Edit3, Trophy, Code2, Briefcase } from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { getProfile, updateProfile } from "../services/userService"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    portfolio: ""
  })

  // Mock radar data for visual appeal (real value could be computed from skills or another API)
  const radarData = [
    { skill: "Frontend", level: 85 },
    { skill: "Backend", level: 70 },
    { skill: "Database", level: 65 },
    { skill: "DevOps", level: 50 },
    { skill: "Design", level: 60 },
  ]

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const userData = await getProfile()
      setUser(userData)
      setFormData({
        bio: userData.bio || "",
        skills: userData.skills ? userData.skills.join(", ") : "",
        portfolio: userData.portfolio || ""
      })
    } catch (err) {
      console.error(err)
      setError("Failed to load profile. Please login.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean)
      const updatedUser = await updateProfile({
        ...formData,
        skills: skillsArray
      })
      setUser(updatedUser)
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      setError("Failed to update profile")
    }
  }

  if (loading) return <div className="text-center pt-24">Loading profile...</div>
  if (error) return <div className="text-center pt-24 text-red-500">{error}</div>
  if (!user) return <div className="text-center pt-24">User not found</div>

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
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="profile"
                    className="w-32 h-32 rounded-full border-4 border-background shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </div>

                <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                  <h1 className="text-3xl font-heading font-bold text-foreground">{user.name}</h1>
                  <p className="text-muted-foreground font-medium">{user.bio || "No bio added yet."}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>

                  {isEditing && (
                    <div className="space-y-2 mt-4 max-w-md">
                      <textarea
                        className="w-full p-2 rounded border bg-background"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      />
                      <input
                        className="w-full p-2 rounded border bg-background"
                        placeholder="Skills (comma separated)"
                        value={formData.skills}
                        onChange={e => setFormData({ ...formData, skills: e.target.value })}
                      />
                      <input
                        className="w-full p-2 rounded border bg-background"
                        placeholder="Portfolio URL"
                        value={formData.portfolio}
                        onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleUpdate} size="sm">Save</Button>
                        <Button variant="ghost" onClick={() => setIsEditing(false)} size="sm">Cancel</Button>
                      </div>
                    </div>
                  )}

                  {!isEditing && (
                    <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                      <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                        <Github className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full hover:text-blue-600 hover:border-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </Button>
                      {user.portfolio && (
                        <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="rounded-full">
                            Portfolio
                          </Button>
                        </a>
                      )}
                    </div>
                  )}

                </div>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 mb-2"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
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
                    {user.skills && user.skills.length > 0 ? (
                      user.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-secondary/50 hover:bg-secondary transition-colors">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No skills added yet.</p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Overall Proficiency</span>
                      <span className="text-primary">{user.score ? Math.min(user.score, 100) : 0}%</span>
                    </div>
                    <Progress value={user.score ? Math.min(user.score, 100) : 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects Section - STILL MOCK FOR NOW OR NEED PROJECT API INTEGRATION */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Card className="rounded-2xl shadow-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold font-heading">Featured Projects</h2>
                  </div>

                  <p className="text-sm text-muted-foreground">My Projects will be loaded dynamically here soon.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Placeholder for now */}
                    <div className="group p-5 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Real Estate Platform</h3>
                      <p className="text-sm text-muted-foreground mt-1">MERN stack app with map integration & advanced filters</p>
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
                      <RadarChart data={radarData} outerRadius="70%">
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
                      "Start adding achievements via API soon!"
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
