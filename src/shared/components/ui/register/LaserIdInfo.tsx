"use client";

import Image from "next/image";
import laserImg from '/public/images/laser-id.png'

function LaserIdInfo() {
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Image
          src={laserImg}
          alt="Laser ID Example"
          width={120}
          height={80}
          className="rounded-md border"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            คำแนะนำ <span className="text-[#65349C]">Laser ID</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            คือข้อมูล 12 หลัก ที่ระบุไว้ด้านหลังบัตรประจำตัวประชาชน
            ประกอบด้วยตัวอักษรภาษาอังกฤษ 2 ตัว และตัวเลข 10 หลัก
            โดยไม่ต้องระบุเครื่องหมายขีด
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-800">
          คำชี้แจงกรณีการขอข้อมูล{" "}
          <span className="text-[#65349C]">Laser code</span> หลังบัตรประจำตัวประชาชน
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          ในการสมัครสมาชิกพรรคและการบริจาคเงิน ทรัพย์สิน
          หรือประโยชน์อื่นใดให้แก่พรรค
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          ด้วยเหตุที่พระราชบัญญัติประกอบรัฐธรรมนูญว่าด้วยพรรคการเมือง
          พ.ศ. 2560 กำหนดให้สมาชิกพรรคการเมืองต้องมีสัญชาติไทยโดยการเกิด
          ในกรณีเป็นผู้มีสัญชาติไทยโดยการแปลงสัญชาติต้องได้สัญชาติไทยมาแล้วไม่น้อยกว่า 5 ปี
          และการรับบริจาคเงิน ทรัพย์สิน หรือประโยชน์อื่นใด
          พรรคการเมืองห้ามรับบริจาคจากบุคคลผู้ไม่มีสัญชาติไทย
          ดังนั้น วิธีการตรวจสอบข้อมูลบุคคลที่มีสัญชาติไทยตามระบบฐานข้อมูลของกรมการปกครอง
          กระทรวงมหาดไทย จำเป็นต้องยืนยันด้วย “รหัสกำกับบัตรประจำตัวประชาชน”
          (Laser code) เพื่อให้สอดคล้องกับบัญญัติแห่งกฎหมาย
          จึงขออภัยในความไม่สะดวกอันเนื่องมาจากความจำเป็นทางกฎหมาย
        </p>
        <p className="text-sm text-gray-600 text-right font-medium">
          ฝ่ายทะเบียนสมาชิกคณะคนไทย
        </p>
      </div>
    </div>
  );
}

export default LaserIdInfo;
