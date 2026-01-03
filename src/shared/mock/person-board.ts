import defaultImg from '/public/images/default-img.jpg'
import { IPerson } from '../types/person.types'

export const committees: IPerson[] = [
   { id: 1, firstName: 'กฤษฎา', lastName: 'เฉลิมสุข', position: 'หัวหน้าพรรค', image: "/images/member-party/1.png" },
   { id: 2, firstName: 'ฆนคม', lastName: 'กิตติสกุลนาม', position: 'รองหัวหน้าพรรค คนที่ 1', image: "/images/member-party/2.png" },
   { id: 3, firstName: 'ภัชย์', lastName: 'แย้มกลิ่น', position: 'รองหัวหน้าพรรค คนที่ 2', image: "/images/member-party/3.png" },
   { id: 4, firstName: 'สิปปภาส', lastName: 'ทิพย์ศร', position: 'รองหัวหน้าพรรค คนที่ 3', image: "/images/member-party/4.png" },
   { id: 5, firstName: 'ชัยวัฒน์', lastName: 'พัดเกาะ', position: 'รองหัวหน้าพรรค คนที่ 4', image: "/images/member-party/5.png" },
   { id: 6, firstName: 'ศรายุทธ', lastName: 'โอสุวรรณรัตน์', position: 'เลขาธิการพรรค', image: "/images/member-party/6.png" },
   { id: 7, firstName: 'พิชญา', lastName: 'ศรีเสน', position: 'เหรัญญิกพรรค', image: "/images/member-party/7.png" },
   { id: 8, firstName: 'ดาริณ', lastName: 'กลางพระเนตร', position: 'ผู้ช่วยเหรัญญิกพรรค', image: "/images/member-party/8.png" },
   { id: 9, firstName: 'สมนึก', lastName: 'เกวียนกระโทก', position: 'นายทะเบียนพรรค', image: "/images/member-party/9.png" },
   { id: 10, firstName: 'ศิริวรรณ', lastName: 'อินทวงค์', position: 'ผู้ช่วยนายทะเบียนพรรค', image: "/images/member-party/10.png" },
   { id: 11, firstName: 'ทรงวุฒิ', lastName: 'พรกุณา', position: 'โฆษกพรรค', image: "/images/member-party/11.png" },
   { id: 12, firstName: 'จีรัชญ์', lastName: 'สีหวงษ์วิลาศ', position: 'กรรมการบริหารพรรค', image: "/images/member-party/12.png" },
   { id: 13, firstName: 'วงศธร', lastName: 'วงค์รักสนิท', position: 'กรรมการบริหารพรรค', image: "/images/member-party/13.png" },
   { id: 14, firstName: 'อภิชาติ', lastName: 'นารีจันทร์', position: 'กรรมการบริหารพรรค', image: "/images/member-party/14.png" },
   { id: 15, firstName: 'ประสิทธิ์', lastName: 'วงศ์สนิท', position: 'กรรมการบริหารพรรค', image: defaultImg },
]