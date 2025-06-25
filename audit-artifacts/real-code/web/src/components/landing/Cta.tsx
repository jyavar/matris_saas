import { Button } from '../ui/button.js'

export function Cta() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t border-gray-800">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Ready to Build on a Solid Foundation?
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join the waitlist and be the first to get access to the STRATO Core
            OS.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <Button size="lg" className="w-full">
            Join the Waitlist
          </Button>
        </div>
      </div>
    </section>
  )
}
