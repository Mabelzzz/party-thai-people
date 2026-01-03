import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

type NavBarItemProps = {
   icon: LucideIcon
   text: string
   path: string
}

function NavBarItem({ icon: Icon, text, path }: NavBarItemProps) {
   return (
      <Link
         href={path}
         className="flex items-center gap-2 border-b pb-2 duration-200 xl:hover:text-pur-400 lg:border-b-0 lg:pb-0"
      >
         {Icon && <Icon strokeWidth={1.5} className="h-5 w-5" />}
         <span className="text-lg">{text}</span>
      </Link>
   )
}

export default NavBarItem
