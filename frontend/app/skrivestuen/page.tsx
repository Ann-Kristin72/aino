"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/lib/api/content";
import ContentCard from "@/components/ContentCard";
import PrimaryButton from "@/components/PrimaryButton";
import Spinner from "@/components/Spinner";

interface Content {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function SkriveStuen() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: contents, isLoading, error } = useQuery<Content[]>({
    queryKey: ["contents"],
    queryFn: getContent,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading content</div>;

  const filteredContents = contents?.filter((content: Content) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-slab text-skifer mb-8">Skrivestuen</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Søk i innhold..."
            className="w-full p-3 rounded-lg border border-warmbrown bg-white text-skifer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents?.map((content: Content) => (
            <ContentCard 
              key={content.id}
              title={content.title}
              content={content.content}
              author={content.author}
              createdAt={content.createdAt}
            />
          ))}
        </div>

        <div className="mt-8">
          <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
            Skriv nytt innlegg
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
} 