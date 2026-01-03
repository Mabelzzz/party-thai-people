import { StaticImageData } from 'next/image'

export type CardPersonProps = {
  members: IPerson[]
  heading: string
}

export interface IPerson {
  id: number
  firstName: string
  lastName: string
  position: string
  image: string | StaticImageData
}
