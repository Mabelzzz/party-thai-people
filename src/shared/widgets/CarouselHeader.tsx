import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '../components/ui/carousel'

function CarouselHeader({ children }: { children?: React.ReactNode }) {
   return (
      <Carousel opts={{ loop: true }} className="w-full bg-gray-600 relative">
         <CarouselContent className=" md:h-100 lg:h-130 xl:h-150">{children}</CarouselContent>
         <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
         <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
      </Carousel>
   )
}
export default CarouselHeader
