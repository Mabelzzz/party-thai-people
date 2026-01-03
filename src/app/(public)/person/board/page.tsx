import Heading_1 from '@/shared/components/Heading_1'
import { committees } from '@/shared/mock/person-board'
import CardPerson from '@/shared/widgets/CardPerson'
import ImageHeader from '@/shared/widgets/ImageHeader'
import Image from 'next/image'
import Khonthai_party1 from '/public/images/Khonthai_party1.jpg'

function BoardPage() {
   return (
      <div className="px-4 xl:w-5xl w-auto lg:w-4xl mx-auto lg:py-8 space-y-9">
         <ImageHeader>
            <Image
              src={Khonthai_party1}
              alt="public image"
              className="w-full h-full overflow-hidden"
              priority
            />
          </ImageHeader>

         <Heading_1>รายชื่อกรรมการบริหารพรรค</Heading_1>
         <div className="space-y-12">
            <CardPerson members={committees} heading="กรรมการบริหาร" />
         </div>
      </div>
   )
}
export default BoardPage
