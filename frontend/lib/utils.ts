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
 */
export function titleCase(text: string): string {
  return text
    .split('-')
    .map(word => {
      // Konverter tilbake fra ASCII til norske tegn
      let converted = word
        .replace(/ae/g, 'æ')
        .replace(/o/g, 'ø')
        .replace(/a/g, 'å');
      
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