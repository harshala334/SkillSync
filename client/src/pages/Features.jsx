import React from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    name: "AI Teammate Matching",
    description:
      "Smartly find like-minded peers for hackathons, competitions, or group projects based on skills, goals, and availability.",
    icon: UserGroupIcon,
  },
  {
    name: "GenAI Skill Coach",
    description:
      "Get personalized roadmaps with weekly plans, YouTube resources, and project suggestions based on your goals.",
    icon: LightBulbIcon,
  },
  {
    name: "Project & Portfolio Builder",
    description:
      "Create and manage project boards, track progress, and auto-generate resumes and portfolios synced with GitHub.",
    icon: DocumentTextIcon,
  },
  {
    name: "Career Growth Tracker",
    description:
      "Visualize your skill development with progress charts, peer endorsements, and smart insights to stay on track.",
    icon: RocketLaunchIcon,
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-indigo-600 font-semibold text-lg">
            Collaborate. Learn. Grow.
          </h2>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4">
            Empowering students to build, learn, and thrive together
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            SkillSync connects you with the right people, tools, and guidance to
            learn smarter and build better.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition p-6 bg-white">
                <CardContent className="flex items-start space-x-4 p-0">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
