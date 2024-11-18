import { useState } from 'react';
import QRCode from './QRCode';

function CustomGen() {
  const [url, setUrl] = useState<string>('');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [includeLogo, setIncludeLogo] = useState<boolean>(false);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [logoSizeRatio, setLogoSizeRatio] = useState<number>(0.15);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Custom QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-4 p-2 border rounded w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center">
          <label className="mr-2">Foreground Color:</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-10 h-10 p-0 border-none"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Background Color:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-10 h-10 p-0 border-none"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Error Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            className="p-2 border rounded shadow-sm"
          >
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2">Include Logo:</label>
        <input
          type="checkbox"
          checked={includeLogo}
          onChange={(e) => setIncludeLogo(e.target.checked)}
          className="h-5 w-5"
        />
      </div>
      {includeLogo && (
        <input
          type="text"
          placeholder="Enter Logo URL"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="mb-4 p-2 border rounded w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
      {url && (
        <div className="mt-4 border-2 border-gray-300 p-2 rounded shadow-lg">
          <QRCode
            text={url}
            size={256}
            fgColor={fgColor}
            bgColor={bgColor}
            level={level}
            includeLogo={includeLogo}
            logoUrl={logoUrl}
            logoSizeRatio={logoSizeRatio}
          />
        </div>
      )}
    </div>
  );
}

export default CustomGen;
