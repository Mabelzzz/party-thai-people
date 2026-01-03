'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PUBLIC_ROUTES } from '../constants/menus.constants'
import { LogoProject } from '../icons'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/shared/components/ui/navigation-menu'

// ---------- submenu groups ----------
const subMenuAbout = [
  { text: 'อุดมการณ์ของพรรค', path: PUBLIC_ROUTES.IDEOLOGY },
  { text: 'ประวัติความเป็นมา', path: PUBLIC_ROUTES.HISTORY },
  { text: 'ผู้บริหารพรรค', path: PUBLIC_ROUTES.PERSON_BOARD },
  { text: 'นโยบายพรรค', path: PUBLIC_ROUTES.POLICY },
  { text: 'สินค้าพรรค', path: PUBLIC_ROUTES.SHOP },
  { text: 'แผนที่ร้านค้าคนไทย', path: PUBLIC_ROUTES.SHOP_MAP },
]
const subMenuPersonBoard = [
  { text: 'ผู้สมัครแบบแบ่งเขต', path: PUBLIC_ROUTES.CONSTITUENCY_CANDIDATE },
  { text: 'ผู้สมัครแบบบัญชีรายชื่อ', path: PUBLIC_ROUTES.PARTY_LIST_CANDIDATE },
]
const subMenuCollaboration = [
  { text: 'ประชาสัมพันธ์', path: PUBLIC_ROUTES.NEWS },
  { text: 'กิจกรรมที่ผ่านมา', path: PUBLIC_ROUTES.PERSON_ACTIVITY },
]
const subMenuAccount = [
  { text: 'สมัครสมาชิกพรรค', path: PUBLIC_ROUTES.REGISTER },
  { text: 'เข้าสู่ระบบสมาชิก', path: PUBLIC_ROUTES.LOGIN },
]

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const isActive = (path: string) => pathname === path
  const isGroupActive = (submenu: { path: string }[]) =>
    submenu.some((item) => pathname.startsWith(item.path))

  return (
    <>
      <div className="h-[90px]" />

      <nav className="fixed top-0 left-0 w-full backdrop-blur-md shadow-sm z-50 transition-all">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10 text-pur-600">
          {/* Logo */}
          <Link href={PUBLIC_ROUTES.HOME} className="flex items-center gap-2">
            <LogoProject width={80} />
            <h1 className="text-2xl font-semibold xl:text-3xl">พรรคคนไทย</h1>
          </Link>

          {/* 🌐 Desktop Menu */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex gap-6 text-lg md:items-center md:gap-8 md:flex-row md:justify-center xl:w-fit">
                <NavItem href={PUBLIC_ROUTES.HOME} label="หน้าหลัก" active={isActive(PUBLIC_ROUTES.HOME)} />
                <DropdownMenu label="เกี่ยวกับพรรค" submenu={subMenuAbout} active={isGroupActive(subMenuAbout)} />
                <DropdownMenu label="รายชื่อผู้สมัคร" submenu={subMenuPersonBoard} active={isGroupActive(subMenuPersonBoard)} />
                <DropdownMenu label="การมีส่วนร่วม" submenu={subMenuCollaboration} active={isGroupActive(subMenuCollaboration)} />
                <DropdownMenu label="เข้าสู่ระบบ" submenu={subMenuAccount} active={isGroupActive(subMenuAccount)} />
                <NavItem href={PUBLIC_ROUTES.DONATION} label="บริจาค" active={isActive(PUBLIC_ROUTES.DONATION)} />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 📱 Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* 📱 Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white absolute left-0 top-[90px] w-full shadow-lg border-t border-gray-200"
            >
              <div className="flex flex-col text-lg text-gray-800 px-6 py-4 space-y-3">
                {/* 🟣 เมนูหลัก (ไม่มีพื้นหลัง) */}
                <Link
                  href={PUBLIC_ROUTES.HOME}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 rounded-md transition ${
                    isActive(PUBLIC_ROUTES.HOME)
                      ? 'text-[#65349C] font-semibold'
                      : 'hover:text-[#65349C]'
                  }`}
                >
                  หน้าหลัก
                </Link>

                <MobileDropdown label="เกี่ยวกับพรรค" submenu={subMenuAbout} pathname={pathname} closeMenu={() => setMenuOpen(false)} />
                <MobileDropdown label="รายชื่อผู้สมัคร" submenu={subMenuPersonBoard} pathname={pathname} closeMenu={() => setMenuOpen(false)} />
                <MobileDropdown label="การมีส่วนร่วม" submenu={subMenuCollaboration} pathname={pathname} closeMenu={() => setMenuOpen(false)} />
                <MobileDropdown label="เข้าสู่ระบบ" submenu={subMenuAccount} pathname={pathname} closeMenu={() => setMenuOpen(false)} />

                <Link
                  href={PUBLIC_ROUTES.DONATION}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 rounded-md transition ${
                    isActive(PUBLIC_ROUTES.DONATION)
                      ? 'text-[#65349C] font-semibold'
                      : 'hover:text-[#65349C]'
                  }`}
                >
                  บริจาค
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

/* ---------- Components ---------- */

// ✅ Desktop Single Nav Item
function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`${navigationMenuTriggerStyle()} transition border-b pb-2 md:border-b-0 md:pb-0 ${
            active
              ? 'text-[#65349C] font-semibold border-b-2 border-[#65349C]'
              : 'hover:text-[#65349C]'
          }`}
        >
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

// ✅ Desktop Dropdown
function DropdownMenu({
  label,
  submenu,
  active,
}: {
  label: string
  submenu: { text: string; path: string }[]
  active: boolean
}) {
  const pathname = usePathname()
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`transition duration-200 border-b pb-2 md:border-b-0 md:pb-0 ${
          active
            ? 'text-[#65349C] font-semibold border-b-2 border-[#65349C]'
            : 'hover:text-[#65349C]'
        }`}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[220px] gap-2">
          {submenu.map((sub) => (
            <NavigationMenuLink key={sub.text} asChild>
              <Link
                href={sub.path}
                className={`block px-2 py-1 rounded-sm duration-200 ${
                  sub.path === pathname
                    ? 'bg-[#d7c1f1] text-[#65349C] font-semibold'
                    : 'hover:bg-[#d7c1f1] hover:text-[#65349C]'
                }`}
              >
                {sub.text}
              </Link>
            </NavigationMenuLink>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

// ✅ Mobile Dropdown (submenu เท่านั้นมีพื้นหลัง)
function MobileDropdown({
  label,
  submenu,
  pathname,
  closeMenu,
}: {
  label: string
  submenu: { text: string; path: string }[]
  pathname: string
  closeMenu: () => void
}) {
  const isActive = (path: string) => pathname === path
  const isGroupActive = submenu.some((item) => pathname.startsWith(item.path))

  return (
    <details
      className={`group border-l-4 pl-3 ${
        isGroupActive ? 'border-[#65349C]' : 'border-transparent'
      }`}
      open={isGroupActive}
    >
      <summary
        className={`cursor-pointer font-medium flex justify-between py-2 ${
          isGroupActive ? 'text-[#65349C]' : 'hover:text-[#65349C]'
        }`}
      >
        {label} <span className="group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <ul className="pl-3 mt-1 space-y-1">
        {submenu.map((s) => (
          <li key={s.text}>
            <Link
              href={s.path}
              onClick={closeMenu}
              className={`block py-1.5 rounded-md pl-2 transition ${
                isActive(s.path)
                  ? 'bg-[#d7c1f1] text-[#65349C] font-semibold'
                  : 'hover:text-[#65349C]'
              }`}
            >
              {s.text}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
