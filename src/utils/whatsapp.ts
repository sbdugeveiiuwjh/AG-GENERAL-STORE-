import { CartItem, CheckoutFormData, StoreSettings } from '../types/grocery';

export function generateWhatsAppOrderMessage(
  cart: CartItem[],
  subtotal: number,
  formData: CheckoutFormData,
  settings: StoreSettings
): string {
  const itemsText = cart
    .map((item, index) => {
      const lineTotal = item.price * item.quantity;
      return `${index + 1}. ${item.nameHi} (${item.nameEn}) — ${item.weight} — Qty: ${item.quantity} (₹${lineTotal})`;
    })
    .join('\n');

  const preferenceText =
    formData.orderType === 'pickup'
      ? '🏪 Store Pickup (दुकान से आकर लेंगे)'
      : `🛵 Local Delivery Request (होम डिलीवरी)\nAddress: ${formData.address}${
          formData.landmark ? `\nLandmark: ${formData.landmark}` : ''
        }`;

  const notesText = formData.notes.trim() ? `\n\nNotes / निर्देश:\n${formData.notes.trim()}` : '';

  const message = `Namaste ${settings.storeName}!
मैं किराना सामान का ऑर्डर देना चाहता/चाहती हूँ।

👤 Customer Name: ${formData.customerName || 'Customer'}
📞 Phone: ${formData.phoneNumber || 'N/A'}

🛒 Order Items:
${itemsText}

💰 Estimated Subtotal: ₹${subtotal}
📦 Order Preference: ${preferenceText}${notesText}

कृपया सामान की उपलब्धता (Availability) और अंतिम राशि की पुष्टि करें।
Please confirm product availability and final amount.

धन्यवाद! (Thank you!)`;

  return message;
}

export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  // Clean phone number: remove +, space, dashes
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
