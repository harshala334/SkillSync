import { motion } from "framer-motion";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12 lg:px-20">
      <motion.h1
        className="text-4xl font-bold text-green-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔍 Explore Opportunities
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Find mentors, projects, and connections tailored to your skills and
        interests.
      </motion.p>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Mentors", "Projects", "Communities"].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              {item}
            </h2>
            <p className="text-gray-600">
              Explore {item.toLowerCase()} that match your goals.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
