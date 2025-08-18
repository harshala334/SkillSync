'use client'
import React from "react";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Skill Coach', href: '#skill-coach' },
  { name: 'Teammates', href: '#teammates' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Leaderboard', href: '#leaderboard' },
  { name: 'Mentorship', href: '#mentorship' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo Section - Left aligned */}
          <div className="flex flex-1 items-center justify-start">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SkillSync</span>
              <img
                alt="SkillSync Logo"
                src="../../src/assets/skillsync_logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Navigation - Center aligned */}
          <div className="hidden lg:flex flex-grow justify-center space-x-8">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 px-4">
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button - Right aligned */}
          <div className="flex flex-1 justify-end">
            <a href="/login" className="text-sm/6 font-semibold text-gray-900">
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">SkillSync</span>
                <img
                  alt="SkillSync Logo"
                  src="../../src/assets/skillsync_logo.png"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}
