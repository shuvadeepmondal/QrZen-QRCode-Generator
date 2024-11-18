import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeProps {
  text: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H'; // Error correction level
  includeLogo?: boolean; // Option to include a logo
  logoUrl?: string; // URL of the logo
  logoSizeRatio?: number; // Size of the logo as a ratio of the QR code size
}

const QRCode: React.FC<QRCodeProps> = ({
  text,
  size = 256,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  level = 'M',
  includeLogo = false,
  logoUrl = '',
  logoSizeRatio = 0.15, // Logo size as 15% of the QR code size by default
}) => {
  return (
    <div className="relative">
      <QRCodeCanvas
        value={text}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
      />
      {includeLogo && logoUrl && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: size * logoSizeRatio,
            height: size * logoSizeRatio,
          }}
        >
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '50%', // Add rounded corners if needed
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QRCode;
