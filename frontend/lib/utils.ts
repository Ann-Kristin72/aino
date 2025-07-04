/**
 * Konverterer tekst til URL-vennlig format med håndtering av norske tegn
 */
export function kebabCase(text: string): string {
  return text
    .toLowerCase()
    // Konverter norske tegn til ASCII-ekvivalenter
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/Æ/g, 'ae')
    .replace(/Ø/g, 'o')
    .replace(/Å/g, 'a')
    // Erstatt mellomrom med bindestrek
    .replace(/\s+/g, '-')
    // Fjern andre spesialtegn, men behold bindestrek og alfanumeriske tegn
    .replace(/[^\w\-]/g, '')
    // Fjern multiple bindestreker
    .replace(/-+/g, '-')
    // Fjern bindestrek i start og slutt
    .replace(/^-+|-+$/g, '');
}

/**
 * Konverterer URL-slug tilbake til lesbar tittel med norske tegn
 * Mer presis konvertering som unngår false positives
 */
export function titleCase(text: string): string {
  return text
    .split('-')
    .map(word => {
      // Mer presis konvertering - kun konverter når det gir mening
      let converted = word;
      
      // Konverter kun når det er sannsynlig at det er en norsk karakter
      // "ae" -> "æ" (kun hvis det ikke er en vanlig engelsk ord)
      if (word === 'ae') converted = 'æ';
      else if (word.includes('ae')) {
        // Sjekk om "ae" er en del av et norsk ord
        const norwegianWords = ['ernaering', 'skaering', 'maeling', 'naering'];
        if (norwegianWords.includes(word)) {
          converted = word.replace(/ae/g, 'æ');
        }
      }
      
      // "o" -> "ø" (kun i spesifikke tilfeller)
      if (word === 'o') converted = 'ø';
      else if (word.includes('o')) {
        // Sjekk om "o" er en del av et norsk ord som skal ha ø
        const norwegianWords = ['foerste', 'foer', 'moer', 'soer'];
        if (norwegianWords.includes(word)) {
          converted = word.replace(/o/g, 'ø');
        }
      }
      
      // "a" -> "å" (kun i spesifikke tilfeller)
      if (word === 'a') converted = 'å';
      else if (word.includes('a')) {
        // Sjekk om "a" er en del av et norsk ord som skal ha å
        const norwegianWords = ['broed', 'moer', 'soer'];
        if (norwegianWords.includes(word)) {
          converted = word.replace(/a/g, 'å');
        }
      }
      
      // Kapitaliser første bokstav
      return converted.charAt(0).toUpperCase() + converted.slice(1);
    })
    .join(' ');
}

// Test norske tegn når utils lastes
console.log('🇳🇴 Norwegian character utils loaded');
testNorwegianChars();

/**
 * Hjelpefunksjon for å teste norske tegn-konvertering
 */
export function testNorwegianChars() {
  const testCases = [
    'Ernæring',
    'Forebygging og beredskap',
    'Psykisk helse og rus',
    'Smittevern og hygiene',
    'Utviklingshemming',
    'Ved livets slutt',
    'Velferdsteknologi'
  ];

  console.log('🧪 Testing Norwegian character handling:');
  testCases.forEach(test => {
    const kebab = kebabCase(test);
    const title = titleCase(kebab);
    console.log(`"${test}" → "${kebab}" → "${title}"`);
  });
} 