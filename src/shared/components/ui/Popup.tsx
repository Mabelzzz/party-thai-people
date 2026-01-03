import { X } from "lucide-react";

interface PopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  popupContent: string;
}

function Popup({ isOpen, setIsOpen, popupContent }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
        <h2 className="text-lg text-gray-900 font-bold mb-4">รายละเอียดเพิ่มเติม</h2>
        <p className="text-gray-600">{popupContent}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-[#65349C] text-white rounded-md hover:bg-[#512a7d]"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup