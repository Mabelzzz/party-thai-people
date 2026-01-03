import Image from 'next/image'
import { CardPersonProps } from '../types/person.types'

function CardPerson({ members }: CardPersonProps) {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7 w-full">
        {members.map((member) => (
          <div key={member.id} className="space-y-2">
            <div className="aspect-square overflow-hidden rounded-sm relative">
              <Image
                src={member.image}
                alt={`${member.firstName} ${member.lastName}`}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-pur-400">{member.firstName}</h1>
              <h1 className="text-xl text-pur-400">{member.lastName}</h1>
              <p className="text-pur-700/70">{member.position}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default CardPerson
