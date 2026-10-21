import { businessConfig } from '@/config/business';

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${businessConfig.WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildCallLink(): string {
  return `tel:${businessConfig.PHONE_NUMBER_RAW.replace(/\s/g, '')}`;
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getWhatsAppMessageForPart(partName: string, tractorModel?: string): string {
  if (tractorModel) {
    return `Hello, I need information about ${partName} for ${tractorModel}. Please share availability and price.`;
  }
  return `Hello, I need information about ${partName}. Please share availability and price.`;
}

export function getWhatsAppMessageForVehicle(brand: string, model: string): string {
  return `Hello, I am interested in ${brand} ${model}. Please share more details.`;
}

export function getWhatsAppMessageForSell(): string {
  return `Hello, I want to sell my vehicle. Please guide me through the process.`;
}

export function getWhatsAppMessageGeneral(): string {
  return `Hello, I have an enquiry regarding tractor parts and vehicles.`;
}
