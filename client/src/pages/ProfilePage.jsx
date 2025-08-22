import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Github, Mail, Linkedin } from "lucide-react"
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
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
              <img
                src="https://avatars.githubusercontent.com/u/000000?v=4"
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-green-400"
              />
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">Harshala Mahajan</h1>
                <p className="text-gray-600">Full-Stack Developer | AI Enthusiast</p>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" size="icon"><Github className="w-5 h-5" /></Button>
                  <Button variant="outline" size="icon"><Linkedin className="w-5 h-5" /></Button>
                  <Button variant="outline" size="icon"><Mail className="w-5 h-5" /></Button>
                </div>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white">Edit Profile</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Node.js</Badge>
                <Badge>MongoDB</Badge>
                <Badge>TailwindCSS</Badge>
                <Badge>Python</Badge>
              </div>
              <div className="space-y-2 mt-4">
                <p className="font-medium">Skill Growth</p>
                <Progress value={70} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skill Radar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Skill Radar</h2>
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <RadarChart data={data} outerRadius="70%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Skill Level" dataKey="level" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-medium">Real Estate Platform</h3>
                  <p className="text-sm text-gray-500">MERN stack app with map & filters</p>
                </div>
                <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-medium">Canteen Website</h3>
                  <p className="text-sm text-gray-500">Menu, cart, and ratings system</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Runner-up in Inter-college Kho-Kho</li>
                <li>District-level Drama Competition Winner</li>
                <li>Reliance Foundation Scholar</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
