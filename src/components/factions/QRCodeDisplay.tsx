'use client';

import { QRCode } from '@/types/factions';
import { generateQRCodeDataURL, downloadQRCode } from '@/lib/qrcode';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface QRCodeDisplayProps {
  qrCode: QRCode;
  showDetails?: boolean;
  allowDownload?: boolean;
  className?: string;
}

export default function QRCodeDisplay({ 
  qrCode, 
  showDetails = true, 
  allowDownload = true,
  className = '' 
}: QRCodeDisplayProps) {
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const dataURL = generateQRCodeDataURL(qrCode.code);
        setQrDataURL(dataURL);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [qrCode.code]);

  const handleDownload = () => {
    downloadQRCode(qrCode.code, `faction-qr-${qrCode.id}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* QR Code Image */}
      <div className="p-6 text-center">
        {isLoading ? (
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="relative inline-block">
            <Image 
              src={qrDataURL} 
              alt={`QR Code: ${qrCode.code}`}
              width={192}
              height={192}
              className="mx-auto border border-gray-200 rounded-lg"
            />
            {qrCode.isUsed && (
              <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  USED
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* QR Code Details */}
      {showDetails && (
        <div className="px-6 pb-6 space-y-3">
          <div className="text-center">
            <p className="text-sm font-mono text-gray-600 break-all">
              {qrCode.code}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Points:</span>
              <span className="ml-2 text-green-600 font-semibold">
                {qrCode.pointsAwarded}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Amount:</span>
              <span className="ml-2">${qrCode.purchaseAmount.toFixed(2)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Created:</span>
              <span className="ml-2">{formatDate(qrCode.createdAt)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span className={`ml-2 font-medium ${qrCode.isUsed ? 'text-red-600' : 'text-green-600'}`}>
                {qrCode.isUsed ? 'Used' : 'Active'}
              </span>
            </div>
          </div>

          {qrCode.expiresAt && (
            <div className="text-xs text-gray-500 text-center">
              Expires: {formatDate(qrCode.expiresAt)}
            </div>
          )}

          {qrCode.usedAt && (
            <div className="text-xs text-gray-500 text-center">
              Used: {formatDate(qrCode.usedAt)}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {allowDownload && !qrCode.isUsed && (
        <div className="px-6 pb-6">
          <button
            onClick={handleDownload}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}