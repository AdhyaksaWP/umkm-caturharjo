import React from 'react'

type Props = {
    params : {
        Title: string | null,
        Width: string,
        Height: string
    },
    onClose: () => void,
    children: React.ReactNode
}

const Popups = ({ params: { Title, Width = "w-64", Height = "h-96" }, onClose, children }: Props) => {
  return (
    <div
      className="px-2 md:px-0 fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg max-h-[90vh] bg-white rounded-lg shadow-lg p-10 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg md:text-xl font-bold">{Title}</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};


export default Popups