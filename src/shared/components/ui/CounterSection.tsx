'use client'

import { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import FlipCounter from '@/shared/components/ui/FlipCounter'

interface CounterSectionProps {
   totalMembers: number
   registeredMembers: number
   target: number
   backgroundImage: string | StaticImageData
}

function CounterSection({ totalMembers, registeredMembers, target, backgroundImage }: CounterSectionProps) {
   const [animate, setAnimate] = useState(false)

   // trigger เมื่อเข้า page ครั้งแรก หรือ reload
   useEffect(() => {
      setAnimate(true)
   }, [])

   const progress = Math.min((registeredMembers / target) * 100, 100)

   return (
      <section id="counter-section" className="relative py-20 text-white flex items-center justify-center">
         {/* Background */}
         <div className="absolute inset-0">
            <Image src={backgroundImage} alt="Background" fill className="object-cover brightness-50" />
            {/* Purple Overlay */}
            <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply" />
         </div>

         {/* Content */}
         <div className="relative z-10 max-w-4xl w-full text-center px-4">
            <h2 className="text-xl font-semibold mb-2">มาจากประชาชน • เป็นของประชาชน • ทำเพื่อประชาชน</h2>

            <h3 className="text-2xl font-bold mb-6">ยอดผู้สมัครเป็นสมาชิกพรรค</h3>

            {/* Total Members */}
            {animate && <FlipCounter value={totalMembers} size={64} />}

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-4 mb-6 mt-6 overflow-hidden">
               <div
                  className={`h-4 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 transition-all duration-[2000ms] ease-out ${
                     animate ? 'w-[var(--progress)]' : 'w-0'
                  }`}
                  style={{ ['--progress' as string]: `${progress}%` }}
               />
            </div>
            <p className="mb-10 text-sm">เป้าหมายของเรา {target.toLocaleString()} คน</p>

            {/* Registered Members */}
            <h3 className="text-lg font-medium mb-2">ยอดสมาชิกพรรคที่ได้ยืนยันข้อมูลแล้ว</h3>
            {animate && <FlipCounter value={registeredMembers} size={48} />}
         </div>
      </section>
   )
}

export default CounterSection
