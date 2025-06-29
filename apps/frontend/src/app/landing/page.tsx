import LandingPage from '../../components/landing/LandingPage'
import RegisterForm from '../../components/landing/RegisterForm'

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
