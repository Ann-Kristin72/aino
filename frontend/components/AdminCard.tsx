interface AdminCardProps {
  name: string;
  email: string;
}

export default function AdminCard({ name, email }: AdminCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-warmbrown">
      <h3 className="text-xl font-slab text-skifer mb-2">{name}</h3>
      <p className="text-warmbrown">{email}</p>
      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 bg-bluegreen text-white rounded-xl hover:bg-bluegreen/90 transition-colors">
          Rediger
        </button>
        <button className="px-4 py-2 bg-softpink text-skifer rounded-xl hover:bg-softpink/90 transition-colors">
          Slett
        </button>
      </div>
    </div>
  );
} 