"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Step4SuccessProps {
  form: {
    firstName: string;
    lastName: string;
    amount: string;
  };
}

export default function Step4Success({ form }: Step4SuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      {/* ✅ วงกลมไอคอนสำเร็จ */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-24 h-24 rounded-full bg-[#f5f0ff] flex items-center justify-center mb-6 shadow-inner"
      >
        <CheckCircle2 className="w-16 h-16 text-[#65349C]" strokeWidth={1.8} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0, 0.5, 0] }}
          transition={{
            delay: 0.3,
            duration: 1.5,
            repeat: 2,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border-4 border-[#65349C]/30"
        />
      </motion.div>

      {/* 🎉 ข้อความหลัก */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-extrabold text-[#65349C] mb-3"
      >
        ขอบคุณสำหรับการบริจาค!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-700 text-base leading-relaxed max-w-md"
      >
        ขอขอบคุณ{" "}
        <span className="font-semibold text-[#65349C]">
          {form.firstName} {form.lastName}
        </span>{" "}
        ที่ร่วมสนับสนุนพรรคคนไทยด้วยยอดบริจาค{" "}
        <span className="font-semibold text-[#65349C]">
          {form.amount} บาท
        </span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-gray-500 mt-2"
      >
        ทีมงานจะตรวจสอบหลักฐานของคุณและยืนยันผลทางอีเมลหรือโทรศัพท์
      </motion.p>

      {/* ปุ่มกลับหน้าหลัก */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-[#65349C] text-white font-semibold text-lg hover:bg-[#542d85] transition-all shadow-md hover:shadow-lg"
        >
          กลับสู่หน้าหลัก
        </Link>
      </motion.div>

      {/* เส้นตกแต่งล่าง */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-10 h-1 w-32 bg-gradient-to-r from-[#65349C] via-[#a585c8] to-[#65349C] rounded-full"
      />
    </motion.div>
  );
}
