'use client'

import { committees } from '@/shared/mock/person-board'
import CardPerson from '@/shared/widgets/CardPerson'
import { IPerson } from '@/shared/types/person.types'

function ParliamentPage() {
  const people: IPerson[] = committees

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#a585c8] mb-6 text-center sm:text-left">
        คณะกรรมการพรรคคนไทย
      </h1>

      <CardPerson members={people} heading="คณะกรรมการพรรคคนไทย" />
    </div>
  )
}

export default ParliamentPage
