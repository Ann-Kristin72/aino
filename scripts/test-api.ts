import fetch from 'node-fetch';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

(async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/roles`);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`Status ${res.status}: ${JSON.stringify(json)}`);
    }

    console.log('✅ API responded:', json);
  } catch (err) {
    console.error('❌ API call failed:', err);
    process.exit(1);
  }
})(); 