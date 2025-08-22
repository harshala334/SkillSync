import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mentors = [
  { id: 1, name: "Ananya Singh", role: "Mentor", skills: "AI, ML, Data Science", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Rohan Mehta", role: "Mentor", skills: "Web Dev, MERN", image: "https://via.placeholder.com/100" },
]

const mentees = [
  { id: 3, name: "Priya Sharma", role: "Mentee", skills: "Looking for AI mentorship", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Arjun Patel", role: "Mentee", skills: "Interested in Web Dev", image: "https://via.placeholder.com/100" },
]

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6 lg:px-12">
      {/* Pinned Profile Card */}
      <Card className="mb-6 border-2 border-green-500 shadow-lg bg-green-50">
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://via.placeholder.com/100" alt="my-profile" className="rounded-full w-20 h-20" />
            <div>
              <h2 className="text-xl font-semibold">My Mentor Profile</h2>
              <p className="text-gray-600">Role: Mentor | Skills: MERN, AI, Startup Guidance</p>
            </div>
          </div>
          <Button className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700">
            Edit Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Mentors Section */}
      <h3 className="text-2xl font-semibold mb-4">Available Mentors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {mentors.map(mentor => (
          <Card key={mentor.id} className="shadow-lg">
            <CardContent className="flex flex-col items-center p-4">
              <img src={mentor.image} alt={mentor.name} className="rounded-full w-20 h-20 mb-3" />
              <h4 className="text-lg font-semibold">{mentor.name}</h4>
              <p className="text-gray-600">{mentor.role}</p>
              <p className="text-sm text-gray-500 mt-1">{mentor.skills}</p>
              <Button className="mt-3 bg-green-600 text-white rounded-xl px-4 py-2 shadow hover:bg-green-700">
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mentees Section */}
      <h3 className="text-2xl font-semibold mb-4">Available Mentees</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentees.map(mentee => (
          <Card key={mentee.id} className="shadow-lg">
            <CardContent className="flex flex-col items-center p-4">
              <img src={mentee.image} alt={mentee.name} className="rounded-full w-20 h-20 mb-3" />
              <h4 className="text-lg font-semibold">{mentee.name}</h4>
              <p className="text-gray-600">{mentee.role}</p>
              <p className="text-sm text-gray-500 mt-1">{mentee.skills}</p>
              <Button className="mt-3 bg-green-600 text-white rounded-xl px-4 py-2 shadow hover:bg-green-700">
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
