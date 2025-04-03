import Section from "./BaseComponents/Section";
import Button from "./BaseComponents/Button";
const Attributes = [
    "Brawn",
    "Agility",
    "Intellect",
    "Cunning",
    "Willpower",
    "Presence"
];

export default function SkillView({ skill, onEdit, onDelete }) {
    return <>
        {skill && <>
            <h2 className="text-lg font-bold">{`${skill.name} (${Attributes[skill.relatedAttribute - 1] || "Unknown Attribute"})`}</h2>
                <Section override classes="border m-2 p-2">
                    <p>{skill.description}</p>
                </Section>
            <Section override>
                <Button override classes='m-2 min-w-20 rounded-md bg-green-800 hover:bg-green-400 hover:text-stone-800' onClick = {onEdit}>Edit</Button>
                <Button override classes='m-2 min-w-20 rounded-md bg-red-800 hover:bg-red-400 hover:text-stone-800' onClick = {() => onDelete(skill.id)}>Delete</Button>
            </Section>
        </>}
    </>
}