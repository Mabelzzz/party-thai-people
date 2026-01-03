import { ChevronRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { PUBLIC_ROUTES } from '../constants/menus.constants'
import { LogoProject } from '../icons'
import { LogoFacebook } from '../icons/facebook'
import { LogoLine } from '../icons/line'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter, FaTiktok } from 'react-icons/fa6'

function Footer() {
   return (
      <div className="container mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-[60%_40%]">
         {/* Left Section */}
         <div className="flex flex-col gap-5 md:pr-8">
            {/* Logo */}
            <div>
               <Link href={PUBLIC_ROUTES.HOME} className="flex items-center gap-2 xl:gap-1">
                  <LogoProject width={60} />
                  <h1 className="text-xl font-semibold xl:text-3xl">พรรคคนไทย</h1>
               </Link>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
               <h1 className="font-semibold text-lg text-[#af78ee]">ติดต่อเรา</h1>

               <div>
                  <Mail className="inline-block mr-2 text-pur-600" />
                  <a
                     href="mailto:pakkhonthai2568@gmail.com"
                     className="hover:underline"
                  >
                     pakkhonthai2568@gmail.com
                  </a>
               </div>

               <div>
                  <LogoFacebook className="inline-block mr-2 w-6 h-6 text-pur-600" />
                  <a
                     href="https://www.facebook.com/profile.php?id=61581773705013"
                     target="_blank"
                     className="hover:underline"
                  >
                     พรรคคนไทย - Khonthai Party
                  </a>
               </div>

               <div>
                  <FaInstagram className="inline-block mr-2 w-5 h-5 text-pur-600" />
                  <a
                     href="https://www.instagram.com/thaipeoplesparty"
                     target="_blank"
                     className="hover:underline"
                  >
                     thaipeoplesparty
                  </a>
               </div>

               <div>
                  <FaXTwitter className="inline-block mr-2 w-5 h-5 text-pur-600" />
                  <a
                     href="https://twitter.com"
                     target="_blank"
                     className="hover:underline"
                  >
                     พรรคคนไทย - Khonthai Party
                  </a>
               </div>

               <div>
                  <FaTiktok className="inline-block mr-2 w-5 h-5 text-pur-600" />
                  <a
                     href="https://www.tiktok.com/@khonthaiparty"
                     target="_blank"
                     className="hover:underline"
                  >
                     @khonthaiparty
                  </a>
               </div>
               <div>
                  <LogoLine className="inline-block mr-2 w-6 h-6 text-pur-600" />
                  <a
                     href="https://lin.ee/TQbifuy"
                     target="_blank"
                     className="hover:underline"
                  >
                     พรรคคนไทย
                  </a>
               </div>
            </div>

            {/* Privacy Policy */}
            <div>
               <Link href={PUBLIC_ROUTES.PRIVACY_POLICY} target="_blank" className="hover:underline">
                  นโยบายคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)
               </Link>
            </div>
         </div>

         {/* Right Section */}
         <div className="flex flex-col gap-5 mt-10 md:mt-0 justify-end sm:justify-center md:pl-8">
            <div className="flex flex-col justify-center items-center md:items-end space-y-1 md:pr-4">
               <h1 className="text-xl font-semibold text-[#af78ee]">สำนักงานใหญ่</h1>
               <p>1/251 ถนนวัชรพล</p>
               <p>แขวงท่าแร้ง เขตบางเขน</p>
               <p>กรุงเทพมหานคร 10220</p>

               {/* Buttons */}
               <div className="grid grid-cols-1 w-full md:w-[80%] md:grid-cols-2 gap-5 mt-5">
                  <Link
                     href={PUBLIC_ROUTES.REGISTER}
                     className="text-white bg-ora-100 hover:bg-white hover:text-ora-100 p-2 flex justify-center items-center gap-1 hover:underline rounded"
                  >
                     สมัครสมาชิกพรรค
                     <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                     href={PUBLIC_ROUTES.DONATION}
                     className="text-white bg-ora-100 hover:bg-white hover:text-ora-100 p-2 flex justify-center items-center gap-1 hover:underline rounded"
                  >
                     บริจาคให้พรรค
                     <ChevronRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Footer
