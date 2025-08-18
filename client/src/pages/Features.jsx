import React from "react";
import {
    UserGroupIcon,
    RocketLaunchIcon,
    DocumentTextIcon,
    LightBulbIcon,
  } from '@heroicons/react/24/outline'
  
  const features = [
    {
      name: 'AI Teammate Matching',
      description:
        'Smartly find like-minded peers for hackathons, competitions, or group projects based on skills, goals, and availability.',
      icon: UserGroupIcon,
    },
    {
      name: 'GenAI Skill Coach',
      description:
        'Get personalized roadmaps with weekly plans, YouTube resources, and project suggestions based on your goals.',
      icon: LightBulbIcon,
    },
    {
      name: 'Project & Portfolio Builder',
      description:
        'Create and manage project boards, track progress, and auto-generate resumes and portfolios synced with GitHub.',
      icon: DocumentTextIcon,
    },
    {
      name: 'Career Growth Tracker',
      description:
        'Visualize your skill development with progress charts, peer endorsements, and smart insights to stay on track.',
      icon: RocketLaunchIcon,
    },
  ]
  
  export default function Features() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Collaborate. Learn. Grow.</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              Empowering students to build, learn, and thrive together
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              SkillSync connects you with the right people, tools, and guidance to learn smarter and build better.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  