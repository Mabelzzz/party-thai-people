'use client'

import { useParams } from 'next/navigation'
import { newsData } from '@/shared/mock/newsData'
import Image from 'next/image'

function NewsDetailPage() {
   const params = useParams()
   const news = newsData.find((n) => n.id === params?.id)

   if (!news) {
      return (
         <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-xl font-bold text-red-500">ไม่พบข่าว</h1>
         </div>
      )
   }

   return (
      <article className="p-6 max-w-4xl mx-auto">
         {/* Hero Image */}
         <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg mb-8">
            <Image fill src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
               <span className="px-3 py-1 bg-[#65349C]/80 rounded-md text-sm shadow">{news.category}</span>
            </div>
         </div>

         {/* Content */}
         <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-[#65349C] mb-4">{news.title}</h1>
            <div className="text-sm text-gray-500 mb-6">
               {news.category} •{' '}
               {new Date(news.date).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
               })}
            </div>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">{news.content}</p>
         </div>
      </article>
   )
}

export default NewsDetailPage
