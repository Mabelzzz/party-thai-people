import CounterSection from '@/shared/components/ui/CounterSection'
import CarouselHeader from '@/shared/widgets/CarouselHeader'
import crowdImg from '/public/images/crowd-bg.png'
import BannerPartyLink from '@/shared/components/banner-party-link'
import { CarouselItem } from '@/shared/components/ui/carousel'
import Link from 'next/link'
import Image from 'next/image'
import { PUBLIC_ROUTES } from '@/shared/constants/menus.constants'
import Khonthai_party1 from '/public/images/Khonthai_party1.jpg'
import Khonthai_party2 from '/public/images/Khonthai_party2.png'

function HomePage() {
   return (
      <div>
         <CarouselHeader>
            <CarouselItem>
               <Link href={PUBLIC_ROUTES.NEWS}>
                  <Image
                     src={Khonthai_party1}
                     alt="public image"
                     className="w-full h-full object-cover"
                  />
               </Link>
            </CarouselItem>
            <CarouselItem>
               <Link href={PUBLIC_ROUTES.NEWS}>
                  <Image
                     src={Khonthai_party2}
                     alt="public image"
                     className="md:w-full md:h-full object-contain md:object-cover"
                  />
               </Link>
            </CarouselItem>
         </CarouselHeader>

         <BannerPartyLink />
         <CounterSection totalMembers={1000} registeredMembers={700} target={100000} backgroundImage={crowdImg} />
      </div>
   )
}
export default HomePage
