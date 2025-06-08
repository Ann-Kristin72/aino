'use client';

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

type ContentMeta = {
  title: string;
  type: string;
  module: string;
  level: string[];
  context: string[];
  illustration?: string;
  video?: string;
  tags?: string[];
};

type ContentData = {
  meta: ContentMeta;
  body: string;
};

export default function ContentPage({
  params,
}: {
  params: { id: string };
}) {
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/content/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContent(data.data));
  }, [params.id]);

  if (!content) return <p>Laster innhold...</p>;

  const { meta, body } = content;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>
      <div className="mb-6 text-gray-700">
        <p>
          <strong>Modul:</strong> {meta.module}
        </p>
        <p>
          <strong>Målgruppe:</strong> {meta.level.join(", ")}
        </p>
        <p>
          <strong>Kontekst:</strong> {meta.context.join(", ")}
        </p>
      </div>

      {meta.illustration && (
        <div className="mb-6">
          <Image
            src={meta.illustration}
            alt="Illustrasjon"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )}

      {meta.video && (
        <div className="mb-6">
          <video controls className="w-full rounded-lg">
            <source src={meta.video} type="video/mp4" />
            Din nettleser støtter ikke video.
          </video>
        </div>
      )}

      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{body}</ReactMarkdown>
      </article>

      {/* Fremtidig Eira-agent-komponent */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="flex items-center gap-2">
          <span role="img" aria-label="robot">🤖</span>
          <strong>Eira:</strong> Trenger du hjelp med dette innholdet? Jeg kan gi deg tips, spørsmål eller quiz!
        </p>
      </div>
    </main>
  );
} 