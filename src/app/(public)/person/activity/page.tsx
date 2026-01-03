'use client'

import Link from 'next/link'
import Image from 'next/image'
import { activityData } from '@/shared/mock/activity'
import defaultImg from '/public/images/default-img.jpg'

function ActivityPage() {
  const activities = activityData

  return (
    <div className="p-6 max-w-6xl mx-auto mb-12">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#a585c8] mb-6">
        กิจกรรมที่ผ่านมา
      </h1>

      {/* Activity Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <Link
            key={`activity-${activity.id}`}
            href={`/person/activity/${activity.id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-[#f3e9fb] group"
          >
            {/* Image */}
            <div className="relative w-full h-56">
              <Image
                src={activity.image || defaultImg}
                alt={activity.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
              <p className="text-sm text-[#7c347e] mb-2 font-medium">
                {new Date(activity.date).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-base font-semibold text-[#65349C] mb-1">
                {activity.title}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {activity.subtitle}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {activity.content[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ActivityPage
