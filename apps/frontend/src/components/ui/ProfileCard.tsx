import React from 'react'

type ProfileCardProps = {
  avatarUrl?: string
  fullName?: string
  username: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  fullName,
  username,
}) => (
  <div
    className="rounded-lg border p-4 flex items-center gap-4 bg-white shadow"
    role="region"
    aria-label={`Profile card for ${fullName || username}`}
  >
    {avatarUrl && (
      <img
        src={avatarUrl}
        alt={fullName ? `Avatar of ${fullName}` : `Avatar of ${username}`}
        className="w-12 h-12 rounded-full object-cover border"
      />
    )}
    <div>
      <div className="font-semibold text-lg">{fullName || username}</div>
      <div className="text-gray-500 text-sm">@{username}</div>
    </div>
  </div>
)

export default ProfileCard
