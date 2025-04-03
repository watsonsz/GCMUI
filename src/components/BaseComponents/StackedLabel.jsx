import Section from "./Section";
import React from 'react';
export default function StackedLabel({ elementOne, elementTwo }) {
    return (
        <Section className="flex flex-col place-content-center m-10" override>
            <div className="text-stone-300 text-sm font-bold">{elementOne}</div>
            <div className="min-w-20 max-w-20 rounded-full text-stone-800 text-sm font-bold border bg-stone-300" >{elementTwo}</div>
        </Section>
    );
}