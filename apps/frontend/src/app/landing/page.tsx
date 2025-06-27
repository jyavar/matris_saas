import LandingPage from '../../components/landing/LandingPage.js'
import RegisterForm from '../../components/landing/RegisterForm.js'

export default function Landing() {
  return (
    <>
      <LandingPage />
      <section className="my-12">
        <RegisterForm />
      </section>
    </>
  )
}
