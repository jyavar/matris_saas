import { BrainCircuit, Cuboid, ShieldCheck, Zap } from 'lucide-react'
import * as React from 'react'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card.js'

type Feature = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: (props) => <Cuboid {...props} />,
    title: 'Elite Modularity',
    description:
      'Build scalable applications with a clean, modular architecture that grows with your needs.',
  },
  {
    icon: (props) => <ShieldCheck {...props} />,
    title: 'Core Auditing',
    description:
      'Maintain code quality and structural integrity with built-in dependency and architecture validation.',
  },
  {
    icon: (props) => <BrainCircuit {...props} />,
    title: 'AI-Powered Agents',
    description:
      'Leverage intelligent agents for automated code generation, refactoring, and quality assurance.',
  },
  {
    icon: (props) => <Zap {...props} />,
    title: 'Unmatched DX',
    description:
      'Experience a seamless developer workflow with pre-configured tools, scripts, and CI/CD pipelines.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-950"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              The Foundation for Your Next Big Thing
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              STRATO Core OS isn&apos;t just a boilerplate. It&apos;s a complete
              operating system for building and scaling modern web applications
              with confidence.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-background/50 border-gray-800 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
