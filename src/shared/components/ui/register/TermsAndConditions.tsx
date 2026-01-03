import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-bold text-[#65349C]">
        ข้อความยืนยันถ้อยแถลง
      </h2>
      <div className="space-y-2">
        <label className="flex items-start">
          <input type="checkbox" className="mr-2 mt-1" />
          ข้าพเจ้ายืนยันว่าข้อมูลที่กรอกเป็นความจริง และยอมให้พรรคประชาชนใช้ข้อมูลในการติดต่อสื่อสาร
        </label>
        <label className="flex items-start">
          <input type="checkbox" className="mr-2 mt-1" />
          ข้าพเจ้าอนุญาตให้พรรคประชาชนเก็บข้อมูลและปฏิบัติตามข้อกฎหมายคุ้มครองข้อมูลส่วนบุคคล
        </label>
      </div>
    </div>
  );
};

export default TermsAndConditions;
