import React from 'react'

export default function ControlTowerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#151c2c] text-white flex flex-col py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-green-400 w-8 h-8 rounded flex items-center justify-center font-bold text-lg">
            S
          </span>
          <span className="font-bold text-xl tracking-tight">STRATO</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a
                href="/control-tower"
                className="flex items-center gap-3 px-3 py-2 rounded bg-blue-700"
              >
                <span className="material-icons">dashboard</span>Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-900"
              >
                <span className="material-icons">swap_horiz</span>Transactions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-900"
              >
                <span className="material-icons">currency_exchange</span>
                Exchange
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-900"
              >
                <span className="material-icons">bar_chart</span>Reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-900"
              >
                <span className="material-icons">chat</span>Conversation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-900"
              >
                <span className="material-icons">group</span>Team
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-900"
              >
                <span className="material-icons">calendar_today</span>Calendar
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
          <input
            type="text"
            placeholder="Search here..."
            className="w-1/3 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center gap-4">
            <button className="relative">
              <span className="material-icons text-gray-500">
                notifications
              </span>
            </button>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
