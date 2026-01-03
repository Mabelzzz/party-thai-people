interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = ["ทั้งหมด", "ดำเนินการ", "ปัดตก", "ผ่านแล้ว"];

  return (
    <div className="flex justify-end gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === tab
              ? "bg-[#65349C] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs