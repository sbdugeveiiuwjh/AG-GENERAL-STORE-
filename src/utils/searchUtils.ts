import { Product, Category } from '../types/grocery';

// Comprehensive synonym dictionary for Hindi, English, and Hinglish transliterations
const SEARCH_SYNONYMS: Record<string, string[]> = {
  // Sugar
  chini: ['चीनी', 'sugar', 'cheeni', 'shakkar', 'सफेद चीनी'],
  cheeni: ['चीनी', 'sugar', 'chini', 'shakkar', 'सफेद चीनी'],
  sugar: ['चीनी', 'chini', 'cheeni', 'shakkar', 'सफेद चीनी'],
  shakkar: ['चीनी', 'sugar', 'chini', 'shakkar'],
  चीनी: ['sugar', 'chini', 'cheeni', 'shakkar', 'सफेद चीनी'],

  // Rice
  chawal: ['चावल', 'rice', 'chaawal', 'usna', 'katarni', 'basmati', 'arwa'],
  chaawal: ['चावल', 'rice', 'chawal'],
  rice: ['चावल', 'chawal', 'usna', 'katarni', 'basmati'],
  usna: ['चावल', 'rice', 'usna rice'],
  चावल: ['rice', 'chawal', 'usna', 'दैनिक'],

  // Flour / Atta / Wheat
  aata: ['आटा', 'atta', 'flour', 'wheat', 'gehu', 'गेहूं'],
  atta: ['आटा', 'aata', 'flour', 'wheat', 'gehu', 'गेहूं', 'चक्की'],
  gehun: ['गेहूं', 'wheat', 'आटा', 'atta'],
  gehu: ['गेहूं', 'wheat', 'आटा', 'atta'],
  wheat: ['गेहूं', 'wheat flour', 'आटा', 'atta'],
  flour: ['आटा', 'atta', 'aata', 'बेसन', 'besan', 'मैदा'],
  आटा: ['atta', 'aata', 'wheat', 'flour', 'गेहूं', 'चक्की'],
  गेहूं: ['wheat', 'atta', 'आटा'],

  // Besan / Gram flour
  besan: ['बेसन', 'gram flour', 'chana besan', 'चना'],
  बेसन: ['besan', 'gram flour', 'चना'],

  // Oil
  tel: ['तेल', 'oil', 'sarson', 'mustard', 'refined', 'kacchi ghani', 'सरसों'],
  tail: ['तेल', 'oil', 'sarson', 'सरसों'],
  oil: ['तेल', 'tel', 'sarson', 'mustard'],
  sarso: ['सरसों', 'sarson', 'mustard', 'oil', 'तेल'],
  sarson: ['सरसों', 'sarso', 'mustard', 'oil', 'तेल', 'कच्ची घानी'],
  mustard: ['सरसों', 'mustard oil', 'तेल', 'sarson'],
  तेल: ['oil', 'tel', 'sarson', 'mustard', 'कच्ची घानी'],
  सरसों: ['mustard', 'sarson', 'oil', 'तेल'],

  // Pulses / Dal
  dal: ['दाल', 'daal', 'pulses', 'arhar', 'toor', 'chana', 'चना', 'अरहर'],
  daal: ['दाल', 'dal', 'pulses', 'arhar', 'toor', 'chana'],
  pulses: ['दाल', 'dal', 'daal', 'pulses'],
  दाल: ['dal', 'daal', 'pulses', 'अरहर', 'तूर', 'चना'],
  दालें: ['dal', 'daal', 'pulses', 'दाल'],
  arhar: ['अरहर', 'तूर', 'toor', 'arhar dal', 'dal'],
  toor: ['अरहर', 'तूर', 'arhar dal', 'dal'],
  अरहर: ['arhar', 'toor', 'dal', 'दाल'],
  तूर: ['arhar', 'toor', 'dal', 'दाल'],
  chana: ['चना', 'चना दाल', 'chana dal', 'besan', 'बेसन', 'dal'],
  चना: ['chana', 'chana dal', 'besan', 'dal', 'दाल'],

  // Spices: Jeera, Dhaniya, Haldi, Mirch, Garam Masala
  jeera: ['जीरा', 'cumin', 'zeera'],
  zeera: ['जीरा', 'jeera', 'cumin'],
  cumin: ['जीरा', 'jeera', 'zeera'],
  जीरा: ['jeera', 'cumin', 'zeera'],
  dhaniya: ['धनिया', 'coriander', 'dhaniya powder'],
  coriander: ['धनिया', 'dhaniya'],
  धनिया: ['dhaniya', 'coriander'],
  haldi: ['हल्दी', 'turmeric', 'haldi powder'],
  turmeric: ['हल्दी', 'haldi'],
  हल्दी: ['haldi', 'turmeric'],
  mirch: ['मिर्च', 'mirchi', 'chilli', 'chili', 'lal mirch', 'लाल मिर्च'],
  mirchi: ['मिर्च', 'mirch', 'chilli', 'lal mirch', 'लाल मिर्च'],
  chilli: ['मिर्च', 'mirch', 'mirchi', 'chilli powder', 'लाल मिर्च'],
  chili: ['मिर्च', 'mirch', 'chilli'],
  मिर्च: ['mirch', 'mirchi', 'chilli', 'लाल मिर्च'],
  masala: ['मसाला', 'spices', 'गरम मसाला', 'खड़ा मसाला'],
  spices: ['मसाले', 'masala', 'साबुत मसाले'],
  मसाला: ['masala', 'spices'],
  मसाले: ['spices', 'masala'],

  // Salt
  namak: ['नमक', 'salt', 'iodized'],
  salt: ['नमक', 'namak'],
  नमक: ['namak', 'salt'],

  // Tea
  chai: ['चाय', 'tea', 'chai patti', 'चाय पत्ती'],
  tea: ['चाय', 'chai', 'tea leaf'],
  चाय: ['tea', 'chai', 'कड़क चाय'],

  // Biscuits / Snacks
  biscuit: ['बिस्कुट', 'biskut', 'parle', 'parle-g', 'मैरी', 'snacks'],
  biskut: ['बिस्कुट', 'biscuit', 'parle'],
  parle: ['पारले', 'parle-g', 'बिस्कुट', 'biscuit'],
  बिस्कुट: ['biscuit', 'biskut', 'parle'],

  // Soap / Detergent
  sabun: ['साबुन', 'soap', 'detergent', 'washing', 'सर्फ', 'detergent powder'],
  soap: ['साबुन', 'sabun', 'detergent'],
  detergent: ['डिटर्जेंट', 'detergent powder', 'साबुन', 'washing powder'],
  साबुन: ['sabun', 'soap', 'detergent']
};

/**
 * Checks whether a given product matches the user's search query across:
 * - Hindi Name (nameHi)
 * - English / Hinglish Name (nameEn)
 * - Description (description)
 * - Category Names (nameHi, nameEn)
 * - Bilingual Synonym / Transliteration Expansion
 */
export function matchesProductSearch(product: Product, query: string, categories?: Category[]): boolean {
  if (!query || !query.trim()) return true;

  const q = query.toLowerCase().trim();
  const searchTerms = q.split(/\s+/).filter(Boolean);

  const pHi = product.nameHi.toLowerCase();
  const pEn = product.nameEn.toLowerCase();
  const pDesc = (product.description || '').toLowerCase();
  const cat = categories?.find(c => c.id === product.categoryId);
  const catHi = (cat?.nameHi || '').toLowerCase();
  const catEn = (cat?.nameEn || '').toLowerCase();
  const fullProductText = `${pHi} ${pEn} ${pDesc} ${catHi} ${catEn} ${product.id}`;

  // 1. Direct full query substring match
  if (fullProductText.includes(q)) return true;

  // 2. Individual word matches
  for (const term of searchTerms) {
    if (term.length >= 2 && fullProductText.includes(term)) return true;

    // Direct synonym lookup
    const synonyms = SEARCH_SYNONYMS[term];
    if (synonyms) {
      for (const syn of synonyms) {
        if (fullProductText.includes(syn.toLowerCase())) {
          return true;
        }
      }
    }
  }

  // 3. Substring matching in synonym keys (e.g. user typed "chini" or "mirchi")
  for (const [key, synonyms] of Object.entries(SEARCH_SYNONYMS)) {
    if ((key.length >= 3 && q.includes(key)) || (q.length >= 3 && key.includes(q))) {
      for (const syn of synonyms) {
        if (fullProductText.includes(syn.toLowerCase())) {
          return true;
        }
      }
    }
  }

  return false;
}
