'use client'

import HeaderWithMegaMenu from '@/shared/headerWithMegaMenu'
import { createTheme, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/navigation'

const competitions = [
  { name: 'IAS', description: 'Prepare for the prestigious Indian Administrative Service.' },
  { name: 'PCS', description: 'Crack the Provincial Civil Services with confidence.' },
  { name: 'CBSE', description: 'Master CBSE curriculum with detailed quiz practice.' },
]

const features = [
  {
    title: 'Expert Curated Questions',
    description: 'Get access to questions curated by experts in each domain.',
  },
  {
    title: 'Real-time Performance Tracking',
    description: 'Monitor your progress and improve with real-time analytics.',
  },
  {
    title: 'Multiple Competitions',
    description: 'Choose from various exams like IAS, PCS, CBSE, and more.',
  },
]

const testimonials = [
  {
    name: 'Amit Sharma',
    feedback:
      'This platform helped me tremendously in my IAS preparation. The quizzes were spot on!',
  },
  {
    name: 'Priya Verma',
    feedback: 'I could track my performance easily, which improved my scores for CBSE exams.',
  },
  {
    name: 'Rahul Singh',
    feedback: 'PCS quiz sets were challenging and exactly what I needed. Highly recommended!',
  },
]

const LandingPage: React.FC = () => {
  const router = useRouter()

  const handleCompetitionClick = (competition: string) => {
    router.push(`/quiz/${competition.toLowerCase()}`)
  }
  const theme = createTheme({
    palette: {
      primary: { main: 'rgba(239, 68, 68, 1)' },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <HeaderWithMegaMenu />

      <header className="bg-red-600 w-full text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to QuickQuiz</h1>
        <p className="mt-4 text-xl">
          Prepare for IAS, PCS, CBSE, and more with curated quiz practice!
        </p>
        <button
          className="mt-8 bg-white text-red-600 px-8 py-3 text-lg font-semibold rounded hover:bg-gray-200"
          onClick={() => router.push('/quiz')}
        >
          Get Started
        </button>
      </header>

      <section className="my-16 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Choose Your Competition
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {competitions.map((competition, index) => (
            <div
              key={index}
              className="shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-center">{competition.name}</h3>
              <p className="text-center text-gray-700 mt-4">{competition.description}</p>
              <button
                className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                onClick={() => handleCompetitionClick(competition.name)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose QuickQuiz?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="shadow-lg p-6 bg-white rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="shadow-lg p-6 bg-white rounded-lg">
                <p className="italic text-gray-600">"{testimonial.feedback}"</p>
                <p className="mt-4 text-lg font-bold text-gray-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-600 w-full py-16 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Next Exam?</h2>
        <p className="text-xl mb-8">
          Join thousands of students who are already improving their performance!
        </p>
        <button
          className="bg-white text-red-600 px-8 py-3 text-lg font-semibold rounded hover:bg-gray-200"
          onClick={() => router.push('/quiz')}
        >
          Start Your Quiz Now
        </button>
      </section>

      <footer className="w-full bg-gray-800 py-8 text-white text-center">
        <p>&copy; {new Date().getFullYear()} QuickQuiz. All rights reserved.</p>
      </footer>
    </ThemeProvider>
  )
}

export default LandingPage
