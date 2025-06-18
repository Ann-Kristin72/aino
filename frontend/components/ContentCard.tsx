interface ContentCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function ContentCard({ title, content, author, createdAt }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
      <h3 className="text-xl font-slab text-skifer mb-2">{title}</h3>
      <p className="text-warmbrown mb-4 line-clamp-3">{content}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-skifer">{author}</span>
        <span className="text-warmbrown">{new Date(createdAt).toLocaleDateString('nb-NO')}</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 bg-bluegreen text-white rounded hover:bg-bluegreen/90 transition-colors">
          Les mer
        </button>
        <button className="px-4 py-2 bg-softpink text-skifer rounded hover:bg-softpink/90 transition-colors">
          Del
        </button>
      </div>
    </div>
  );
} 