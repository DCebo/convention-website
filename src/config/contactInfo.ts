export interface ContactInfo {
  email: string
  location: string
  eventDate: string
  eventLocation: string
}

// Change information here when needing to update contact information
export const contactInfo: ContactInfo = {
  email: 'info@collectitcon.com',
  location: 'Collingwood, VIC',
  eventDate: 'Nov. 29th, 2025',
  eventLocation: 'Collingwood, VIC',
}

// Helper functions for easy access
export const getContactEmail = (): string => contactInfo.email
export const getContactLocation = (): string => contactInfo.location
export const getEventDate = (): string => contactInfo.eventDate
export const getEventLocation = (): string => contactInfo.eventLocation
