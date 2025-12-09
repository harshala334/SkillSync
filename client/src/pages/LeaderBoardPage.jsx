// src/pages/LeaderboardPage.jsx
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Medal } from "lucide-react"
import { getLeaderboard } from "../services/userService"

export default function LeaderBoardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        // Map API data to component structure if needed, or adjust component to match API
        // API returns: [{ _id, name, skills, score }]
        // We need: id, name, role (skills[0]?), score, projects (?), feedback (?), avatar, rank
        const mappedData = data.map((user, index) => ({
          id: user._id,
          name: user.name,
          role: user.skills && user.skills.length > 0 ? user.skills[0] : "Student",
          score: user.score || 0,
          projects: 0, // Placeholder
          feedback: "⭐️⭐️⭐️⭐️⭐️", // Placeholder
          avatar: `https://ui-avatars.com/api/?name=${user.name}&background=random`,
          rank: index + 1
        }));
        setLeaderboard(mappedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center pt-24">Loading leaderboard...</div>
  if (error) return <div className="text-center pt-24 text-red-500">{error}</div>

  return (
    <div className="bg-background min-h-screen pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-2xl mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            College <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Celebrating top contributors in projects, collaboration, and peer learning 🚀
          </p>
        </div>

        {/* Leaderboard grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {leaderboard.map((user) => (
            <Card
              key={user.id}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl border-t-4 bg-card/50 backdrop-blur-sm ${user.rank === 1
                ? "border-yellow-400 shadow-yellow-500/10"
                : user.rank === 2
                  ? "border-gray-400 shadow-gray-500/10"
                  : user.rank === 3
                    ? "border-amber-700 shadow-amber-700/10"
                    : "border-primary/20"
                }`}
            >
              {/* Rank Badge */}
              <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-bold ${user.rank === 1 ? "bg-yellow-400 text-yellow-950" :
                user.rank === 2 ? "bg-gray-400 text-gray-900" :
                  user.rank === 3 ? "bg-amber-700 text-amber-100" :
                    "bg-secondary text-muted-foreground"
                }`}>
                #{user.rank}
              </div>

              <CardHeader className="flex flex-col items-center gap-4 pb-2 pt-8">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className={`w-20 h-20 rounded-full border-4 ${user.rank === 1 ? "border-yellow-400" :
                      user.rank === 2 ? "border-gray-400" :
                        user.rank === 3 ? "border-amber-700" :
                          "border-background shadow-sm"
                      }`}
                  />
                  {user.rank <= 3 && (
                    <div className="absolute -bottom-2 -right-2 bg-background p-1 rounded-full shadow-sm">
                      <Medal className={`w-6 h-6 ${user.rank === 1 ? "text-yellow-500" :
                        user.rank === 2 ? "text-gray-400" :
                          "text-amber-700"
                        }`} />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <CardTitle className="text-lg font-bold">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Projects Completed</span>
                  <Badge variant="secondary" className="font-mono">{user.projects}</Badge>
                </div>

                {/* Progress Score */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Contribution Score</span>
                    <span className="font-bold text-primary">{user.score}%</span>
                  </div>
                  <Progress value={Math.min(user.score, 100)} className="h-2" />
                </div>

                {/* Feedback */}
                <div className="flex items-center justify-center gap-1 text-sm text-yellow-500 bg-yellow-500/5 py-2 rounded-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium text-foreground">{user.feedback}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
