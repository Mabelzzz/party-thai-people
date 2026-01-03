function Legend() {
  return (
    <div className="flex justify-end gap-6 mb-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-16 h-4 bg-green-500 rounded-lg"></span> ผ่าน
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 h-4 bg-yellow-400 rounded-lg"></span> ดำเนินการ
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 h-4 border-2 border-green-500 rounded-lg"></span>{" "}
        ไม่ถูกดึงไปพิจารณา
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 h-4 bg-red-500 rounded-lg"></span> ระงับ/ปัดตก
      </div>
    </div>
  );
}

export default Legend