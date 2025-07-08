export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm">
          © 2024 STRATO Core OS™. Todos los derechos reservados.
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="/privacy"
            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
          >
            Privacidad
          </a>
          <a
            href="/terms"
            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
          >
            Términos
          </a>
          <a
            href="/legal"
            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
          >
            Legal
          </a>
        </div>
      </div>
    </footer>
  )
}
