'use client'

import NewsList from '@/shared/components/ui/NewsList'
import CounterSection from '@/shared/components/ui/CounterSection'
import { newsData } from '@/shared/mock/newsData'
import crowdImg from '/public/images/crowd-bg.png'

function NewsPage() {
   return (
      <>
         <div className="p-6 max-w-6xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-[#a585c8] mb-6">ข่าวทั้งหมด</h1>
            <NewsList data={newsData} />
         </div>

         <CounterSection totalMembers={1000} registeredMembers={700} target={100000} backgroundImage={crowdImg} />
      </>
   )
}

export default NewsPage
