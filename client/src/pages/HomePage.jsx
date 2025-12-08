'use client'
import React from "react";
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse-slow"
          />
        </div>

        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/50 transition-all duration-300 bg-white/50 backdrop-blur-sm">
              Find your perfect teammate today!{' '}
              <a href="#" className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-heading font-bold tracking-tight text-foreground sm:text-7xl drop-shadow-sm">
              Find the Right Teammates, <br />
              <span className="text-gradient">Build Projects</span>, and Learn Together
            </h1>
            <p className="mt-8 text-lg font-medium text-muted-foreground sm:text-xl/8 max-w-2xl mx-auto">
              SkillSync connects students based on shared skills, goals, and availability. Start learning, building, and collaborating with like-minded peers today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link to="/features" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-1">
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse-slow delay-700"
          />
        </div>
      </div>
    </div>
  );
}
