"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Step1UserInfo from "@/shared/components/ui/donation/Step1UserInfo";
import Step2Transfer from "@/shared/components/ui/donation/Step2Transfer";
import Step3Confirm from "@/shared/components/ui/donation/Step3Confirm";
import Step4Success from "@/shared/components/ui/donation/Step4Success";

export default function DonationSteps() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    amount: "",
    slip: null as File | null,
  });

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  };
  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="relative flex flex-col h-auto bg-white rounded-2xl shadow-lg border border-violet-100 p-6 max-w-3xl mx-auto my-8 sm:my-10 w-[92%] sm:w-auto overflow-hidden">
    {/* <div className="relative bg-white rounded-2xl shadow-lg border border-violet-100 p-6 sm:p-8 md:p-10 max-w-3xl mx-auto my-8 sm:my-10 w-[92%] sm:w-auto overflow-hidden"> */}
      {/* Progress Bar */}
      {step < 4 && (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-10 text-sm font-medium text-gray-500 space-y-3 sm:space-y-0 sm:space-x-3">
          <StepItem label="ข้อมูลผู้บริจาค" num={1} active={step >= 1} />
          <span className="hidden sm:block">›</span>
          <StepItem label="รายละเอียดการบริจาค" num={2} active={step >= 2} />
          <span className="hidden sm:block">›</span>
          <StepItem label="ยืนยัน" num={3} active={step >= 3} />
        </div>
      )}

      {/* Animated Step Content */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
            layout // ✅ เพิ่มเพื่อให้ Framer Motion ปรับความสูงตามเนื้อหาอัตโนมัติ
          >
            {step === 1 && (
              <Step1UserInfo form={form} setForm={setForm} onNext={next} />
            )}
            {step === 2 && (
              <Step2Transfer
                form={form}
                setForm={setForm}
                onNext={next}
                onBack={prev}
              />
            )}
            {step === 3 && (
              <Step3Confirm form={form} onBack={prev} onNext={next} />
            )}
            {step === 4 && <Step4Success form={form} />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

/* Step Item UI */
function StepItem({
  label,
  num,
  active,
}: {
  label: string;
  num: number;
  active: boolean;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
          active
            ? "bg-[#65349C] text-white shadow-md scale-105"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {num}
      </div>
      <span
        className={`font-medium text-xs sm:text-sm ${
          active ? "text-[#65349C]" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
