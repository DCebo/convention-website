export interface ContactInfo {
  email: string;
  location: string;
  eventDate: string;
  eventLocation: string;
}

export const contactInfo: ContactInfo = {
  email: 'info@collectitcon.com', // ← CHANGE THIS EMAIL HERE
  location: 'Collingwood, VIC',
  eventDate: 'Nov. 29th, 2025',
  eventLocation: 'Collingwood, VIC'
};

// Helper functions for easy access
export const getContactEmail = (): string => contactInfo.email;
export const getContactLocation = (): string => contactInfo.location;
export const getEventDate = (): string => contactInfo.eventDate;
export const getEventLocation = (): string => contactInfo.eventLocation;