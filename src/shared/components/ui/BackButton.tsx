'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  href?: string
  label?: string
}

export default function BackButton({ href, label = 'ย้อนกลับ' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) router.push(href)
    else router.back()
  }

  return (
    <div className="px-10 mx-auto pt-6">
      <button
        onClick={handleClick}
        className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#d7c3f0] bg-white text-[#65349C] shadow-sm hover:bg-[#65349C] hover:text-white hover:shadow-md transition-all duration-200"
        aria-label={label}
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>
    </div>
  )
}
