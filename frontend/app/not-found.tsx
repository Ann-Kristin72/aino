export default function NotFound() {
  return (
    <div className="min-h-screen bg-latte p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-slab text-warmbrown mb-4">Side ikke funnet</h2>
      <p className="text-skifer mb-4">Beklager, men siden du leter etter finnes ikke.</p>
      <a
        href="/"
        className="bg-bluegreen text-white px-4 py-2 rounded-2xl shadow hover:bg-teal-700 transition"
      >
        Gå til forsiden
      </a>
    </div>
  );
} 