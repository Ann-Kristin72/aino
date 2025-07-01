import React from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const colors = ["teal", "orange", "yellow", "peach", "green", "sand"] as const;

export default function DesignGuide() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">🎨 Jodaskills Designsystem – Fargepalett & Komponenter</h1>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Fargepalett</h2>
        <div className="flex gap-4 mb-4">
          {colors.map((color) => (
            <div key={color} className={`w-16 h-16 rounded-lg border-2 border-joda-${color} bg-joda-${color}`} title={color}></div>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          {colors.map((color) => (
            <span key={color} className="capitalize">{color}</span>
          ))}
        </div>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Button-komponent</h2>
        <div className="flex gap-4 flex-wrap mb-2">
          {colors.map((color) => (
            <Button key={color} color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          ))}
        </div>
        {/* Bruk: <Button color="teal">Teal Button</Button> */}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Card-komponent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colors.map((color) => (
            <Card key={color} color={color} title={`Card – ${color.charAt(0).toUpperCase() + color.slice(1)}`}>Eksempelinnhold for {color}.</Card>
          ))}
        </div>
        {/* Bruk: <Card color="teal" title="Tittel">Innhold</Card> */}
      </section>
    </div>
  );
} 