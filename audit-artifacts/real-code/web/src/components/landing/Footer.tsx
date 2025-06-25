import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} STRATO Core OS™. All Rights Reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-gray-400"
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-gray-400"
        >
          Privacy
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-gray-400"
        >
          GitHub
        </Link>
      </nav>
    </footer>
  )
}
