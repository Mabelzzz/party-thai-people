import Link from 'next/link'
import { News } from '@/shared/types/news.types'
import Image from 'next/image'

interface NewsCardProps {
   news: News
}

function NewsCard({ news }: NewsCardProps) {
   return (
      <Link href={`/news/${news.id}`} className="block">
         <div
            className="
          bg-white rounded-xl shadow-md overflow-hidden 
          flex flex-col h-full
          transition-transform duration-300 ease-out 
          hover:scale-105 hover:shadow-xl
          group
        "
         >
            {/* รูปภาพ */}
            <div className="relative w-full h-48 overflow-hidden">
               <Image
                  fill
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               />
            </div>

            {/* เนื้อหา */}
            <div className="p-5 flex flex-col flex-1">
               <div className="text-xs text-gray-500 mb-2">
                  {news.category} • {new Date(news.date).toLocaleDateString('th-TH')}
               </div>
               <h2
                  className="
              text-lg font-bold text-gray-800 mb-2 line-clamp-2 
              group-hover:text-[#65349C] transition-colors
            "
               >
                  {news.title}
               </h2>
               <p className="text-gray-600 text-sm line-clamp-3 mb-4">{news.summary}</p>

               {/* ปุ่ม อ่านต่อ */}
               <span
                  className="
              mt-auto text-[#65349C] font-medium 
              group-hover:underline group-hover:text-[#512a7d] transition
            "
               >
                  อ่านต่อ →
               </span>
            </div>
         </div>
      </Link>
   )
}

export default NewsCard
