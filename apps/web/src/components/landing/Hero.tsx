import { RocketIcon } from 'lucide-react'

import Button from '../ui/button.js'

export function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Deploy Your Vision with STRATO Core OS™
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                The ultimate monorepo framework with built-in governance,
                AI-powered agents, and elite DX for building enterprise-grade
                SaaS platforms.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg">
                Request Demo
                <RocketIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center rounded-xl bg-gray-900/50 border border-gray-800 p-8 shadow-xl backdrop-blur-sm">
            <div className="text-center">
              <pre className="font-mono text-5xl text-gray-400 tracking-widest">{`{...}`}</pre>
              <p className="text-gray-500 mt-2">
                Conceptual Code Visualization
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
