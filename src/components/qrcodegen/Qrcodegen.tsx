import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const Qrcodegen: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [size, setSize] = useState<number>(256);
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (qrCodeRef.current) {
      try {
        const dataUrl = await toPng(qrCodeRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Qr<span className='text-purple-800'>Z</span>en</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="p-2 border rounded-xl mb-4 w-full max-w-md"
      />
      <div className="flex space-x-2 font-semibold mb-4">
        <label>
          Size:
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="px-2 py-1 border rounded-xl ml-3 w-[5rem]"
          />
        </label>
        <label>
          Foreground Color:
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="p-1 h-8 w-8"
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="p-1 h-8 w-8"
          />
        </label>
      </div>

      <div className="mb-4 flex ml-24">
        <label className="block font-semibold mt-1 ">Upload Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="mb-2 ml-3"
        />
      </div>
      {customPhoto && (
          <div className="flex flex-col items-center">
            <img
              src={customPhoto}
              alt="Custom Photo"
              className="w-20 h-20 object-contain mb-2 border border-gray-300"
            />
          </div>
        )}

      {inputValue && (
        <div ref={qrCodeRef} className="relative p-2 bg-white">
          <QRCode value={inputValue} size={size} fgColor={fgColor} bgColor={bgColor} />
          {customPhoto && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ width: size * 0.2, height: size * 0.2 }}
            >
              <img
                src={customPhoto}
                alt="Overlayed Custom Photo"
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </div>
      )}
      {inputValue && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download as Image
        </button>
      )}
    </div>
  );
};
export default Qrcodegen;
