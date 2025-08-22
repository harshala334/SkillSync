// src/pages/LeaderboardPage.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Award } from "lucide-react"

const leaderboardData = [
  {
    id: 1,
    name: "Aarav Patel",
    role: "Full-Stack Developer",
    score: 95,
    projects: 8,
    feedback: "⭐️⭐️⭐️⭐️⭐️",
    avatar: "https://ui-avatars.com/api/?name=Aarav+Patel",
    rank: 1,
  },
  {
    id: 2,
    name: "Riya Sharma",
    role: "UI/UX Designer",
    score: 89,
    projects: 6,
    feedback: "⭐️⭐️⭐️⭐️",
    avatar: "https://ui-avatars.com/api/?name=Riya+Sharma",
    rank: 2,
  },
  {
    id: 3,
    name: "Kabir Singh",
    role: "Backend Engineer",
    score: 82,
    projects: 7,
    feedback: "⭐️⭐️⭐️⭐️",
    avatar: "https://ui-avatars.com/api/?name=Kabir+Singh",
    rank: 3,
  },
  {
    id: 4,
    name: "Simran Kaur",
    role: "Data Analyst",
    score: 78,
    projects: 5,
    feedback: "⭐️⭐️⭐️⭐️",
    avatar: "https://ui-avatars.com/api/?name=Simran+Kaur",
    rank: 4,
  },
]

export default function LeaderBoardPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-indigo-700 flex justify-center items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            College Leaderboard
          </h1>
          <p className="text-gray-600">
            Celebrating top contributors in projects, collaboration, and peer learning 🚀
          </p>
        </div>

        {/* Leaderboard grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaderboardData.map((user) => (
            <Card
              key={user.id}
              className={`rounded-2xl shadow-md hover:shadow-xl transition border-t-4 ${
                user.rank === 1
                  ? "border-yellow-400"
                  : user.rank === 2
                  ? "border-gray-400"
                  : user.rank === 3
                  ? "border-amber-700"
                  : "border-indigo-200"
              }`}
            >
              <CardHeader className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border"
                />
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge
                    variant="outline"
                    className="bg-indigo-50 text-indigo-700"
                  >
                    Rank #{user.rank}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {user.projects} Projects
                  </span>
                </div>

                {/* Progress Score */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Contribution Score
                  </p>
                  <Progress value={user.score} className="h-2" />
                  <p className="text-xs text-gray-700 mt-1">{user.score}%</p>
                </div>

                {/* Feedback */}
                <div className="flex items-center gap-2 text-sm text-yellow-600">
                  <Star className="w-4 h-4" />
                  {user.feedback}
                </div>

                {/* Award Badge for Top 3 */}
                {user.rank <= 3 && (
                  <div className="flex justify-end">
                    <Award
                      className={`w-6 h-6 ${
                        user.rank === 1
                          ? "text-yellow-500"
                          : user.rank === 2
                          ? "text-gray-400"
                          : "text-amber-700"
                      }`}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
