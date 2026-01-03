import { activityData } from '@/shared/mock/activity'
import Image from 'next/image'

interface ActivityDetailProps {
  params: Promise<{ id: string }>
}

export default async function ActivityDetail({ params }: ActivityDetailProps) {
  const { id } = await params
  const activity = activityData.find((a) => a.id === Number(id))

  if (!activity) return <div className="p-10 text-center">ไม่พบข้อมูลกิจกรรม</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="w-full mb-6 rounded-xl overflow-hidden bg-white">
        <Image
          src={activity.image}
          alt={activity.title}
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl"
        />
      </div>

      <h1 className="text-3xl font-bold text-[#af78ee] mb-2">{activity.title}</h1>
      <p className="text-ora-100 font-medium mb-4">{activity.subtitle}</p>
      <p className="text-sm text-gray-500 mb-6">
        วันที่{' '}
        {new Date(activity.date).toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        | สถานที่: {activity.location}
      </p>

      <div className="space-y-4 leading-relaxed">
        {activity.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}
