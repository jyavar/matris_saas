export function SocialProof() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our framework powers innovation at top-tier companies.
          </p>
        </div>
        <div className="mx-auto w-full max-w-lg">
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 text-gray-500 font-semibold text-lg">
            <div className="flex justify-center">Vercel</div>
            <div className="flex justify-center">Stripe</div>
            <div className="flex justify-center">OpenAI</div>
            <div className="flex justify-center">Linear</div>
          </div>
        </div>
      </div>
    </section>
  )
}
