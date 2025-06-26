import React from 'react'

type UserBadgeProps = {
  username: string
  status?: 'online' | 'offline'
}

const statusColor = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
}

const UserBadge: React.FC<UserBadgeProps> = ({
  username,
  status = 'offline',
}) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium"
    role="status"
    aria-label={`User ${username} is ${status}`}
  >
    <span className={`w-2 h-2 rounded-full ${statusColor[status]}`}></span>
    {username}
    <span className="ml-2 text-xs text-gray-500">{status}</span>
  </span>
)

export default UserBadge
