import React from 'react';
import { useImperativeHandle, useRef } from 'react';
import StackedLabel from './BaseComponents/StackedLabel';
import Section from './BaseComponents/Section';
import Button from './BaseComponents/Button';

export default function ArchetypeView({ archetype, onEdit, onDelete }) {

    return (
        <>
            {archetype && <>
                <h2 className="text-lg font-bold">{archetype.name}</h2>
                <Section override classes="flex border justify-evenly m-2 p-2">
                    {archetype.attributes.map((attribute, index) => (
                        <StackedLabel key ={index} elementOne={attribute.name} elementTwo={attribute.value} />
                    ))}
                </Section>
                <Section override classes="flex border justify-evenly m-2 p-2">
                    <StackedLabel elementOne="Wound Threshold" elementTwo={archetype.woundThreshold} />
                    <StackedLabel elementOne="Strain Threshold" elementTwo={archetype.strainThreshold} />
                    <StackedLabel elementOne="Starting XP" elementTwo={archetype.startingExperience} />
                </Section>
                <Section override classes="flex justify-between m-2 p-2">
                    <Section override classes="border m-2 p-2 w-1/2">
                        <h2 className="text-lg font-bold">Description</h2>
                        {archetype.description ? <p>{archetype.description}</p> : <p>No description available</p>}
                    </Section>
                    <Section override classes="border m-2 p-2 w-1/2">
                        <h2 className="text-lg font-bold">Archetype Ability</h2>
                        <p>{archetype.archetypeAbility}</p>
                    </Section>
                </Section>
                <p>{archetype.startingSkills}</p>
                <Section override>
                    <Button override classes='m-2 min-w-20 rounded-md bg-green-800 hover:bg-green-400 hover:text-stone-800' onClick = {onEdit}>Edit</Button>
                    <Button override classes='m-2 min-w-20 rounded-md bg-red-800 hover:bg-red-400 hover:text-stone-800' onClick = {() => onDelete(archetype.id)}>Delete</Button>
                </Section>
            </>}
        </>
    );
}