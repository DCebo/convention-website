import { QRCode } from '@/types/factions';

/**
 * Generates a unique QR code for faction point tracking
 */
export function generateQRCode(
  userId: string,
  factionId: string,
  purchaseAmount: number,
  ticketId?: string
): QRCode {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const code = `FC-${factionId.toUpperCase().substring(0, 3)}-${userId.substring(0, 8)}-${timestamp}-${randomSuffix}`;
  
  const pointsAwarded = Math.floor(purchaseAmount); // 1 point per dollar
  
  return {
    id: `qr-${timestamp}-${randomSuffix}`,
    code,
    userId,
    factionId,
    ticketId,
    purchaseAmount,
    pointsAwarded,
    isUsed: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };
}

/**
 * Validates a QR code format
 */
export function validateQRCode(code: string): boolean {
  const qrPattern = /^FC-[A-Z]{3}-[A-Za-z0-9]{8}-\d{13}-[a-z0-9]{6}$/;
  return qrPattern.test(code);
}

/**
 * Extracts information from a QR code
 */
export function parseQRCode(code: string): {
  factionPrefix: string;
  userId: string;
  timestamp: string;
  randomSuffix: string;
} | null {
  if (!validateQRCode(code)) {
    return null;
  }
  
  const parts = code.split('-');
  return {
    factionPrefix: parts[1],
    userId: parts[2],
    timestamp: parts[3],
    randomSuffix: parts[4],
  };
}

/**
 * Generates QR code data URL for display (placeholder implementation)
 * In a real implementation, this would use a QR code library like 'qrcode'
 */
export function generateQRCodeDataURL(code: string): string {
  // This is a placeholder. In a real implementation, you would use:
  // import QRCode from 'qrcode';
  // return await QRCode.toDataURL(code);
  
  // For now, return a placeholder SVG
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white" stroke="black" stroke-width="2"/>
      <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12" fill="black">
        QR Code
      </text>
      <text x="100" y="120" text-anchor="middle" font-family="monospace" font-size="8" fill="gray">
        ${code}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Creates a downloadable QR code file
 */
export function downloadQRCode(code: string, filename?: string): void {
  const dataURL = generateQRCodeDataURL(code);
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename || `faction-qr-${code}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}