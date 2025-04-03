import React from "react";

const ColorPaletteDemo = () => {
  return (
    <div className="bg-stone-800 min-h-screen p-10 text-stone-200">
      <h1 className="text-4xl font-bold text-center mb-8">Website Color Palette</h1>
      
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Primary Colors */}
        <div className="bg-orange-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-lg font-semibold">Accent (Buttons, Highlights)</p>
          <p className="text-sm">#9F2D00 - Tailwind: orange-800</p>
        </div>

        <div className="bg-stone-200 p-6 rounded-2xl shadow-lg text-center text-stone-800">
          <p className="text-lg font-semibold">Neutral Light (Text, Sections)</p>
          <p className="text-sm">#EAE0D5 - Tailwind: stone-200</p>
        </div>

        {/* Supporting Colors */}
        <div className="bg-amber-600 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-lg font-semibold">Muted Orange (Hover States, Secondary Buttons)</p>
          <p className="text-sm">#D76A03 - Tailwind: amber-600</p>
        </div>

        <div className="bg-lime-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-lg font-semibold">Deep Olive (Dividers, Accents)</p>
          <p className="text-sm">#5A5A38 - Tailwind: lime-800</p>
        </div>

        <div className="bg-slate-700 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-lg font-semibold">Cool Contrast (Secondary Call-to-Action, Highlights)</p>
          <p className="text-sm">#3A506B - Tailwind: slate-700</p>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteDemo;
