'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ErrorProps {
  error: Error
  reset: () => void
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="mt-4 text-lg">Error: {error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Try Again
      </button>
    </div>
  )
}

export default ErrorPage
