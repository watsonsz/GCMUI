import React from 'react';
import { useEffect, useState, useRef,  } from 'react';
import Attributes from '../Attributes';
import FormInput from '../BaseComponents/FormInput';
import SubmitButton from '../BaseComponents/SubmitButton';
import Section from '../BaseComponents/Section';
import { GetAllArchetypes, PostArchetype, GetArchetype, PutArchetype, DeleteArchetype } from '../../Helpers/ArchetypeHelper';
import ArchetypeView from '../ArchetypeView';
import CustomModal from '../BaseComponents/CustomModal';

const baseFormState = {
    name: "",
    description: "",
    woundThreshold: 0,
    strainThreshold: 0,
    startingExperience: "",
    startingSkills: "",
    archetypeAbility: "",
    Attributes: [{
        id: null,
        attributeId: 1,
        archetypeId: null,
        name: "Strength",
        description: "",
        value: 0
    },
    {
        id: null,
        attributeId: 2,
        archetypeId: null,
        name: "Agility",
        description: "",
        value: 0
    },
    {
        id: null,
        attributeId: 3,
        archetypeId: null,
        name: "Intellect",
        description: "",
        value: 0
    },
    {
        id: null,
        attributeId: 4,
        archetypeId: null,
        name: "Cunning",
        description: "",
        value: 0
    },
    {
        id: null,
        attributeId: 5,
        archetypeId: null,
        name: "Willpower",
        description: "",
        value: 0
    },
    {
        id: null,
        attributeId: 6,
        archetypeId: null,
        name: "Presence",
        description: "",
        value: 0
    },

    ]
};

export default function ArchetypeForm({isOpen, ...props}) {
    const [archetypeRequest, setInputValue] = useState({...baseFormState});
    const [archetypes, setArchetypes] = useState([]);
    const [selectedArchetype, setSelectedArchetype] = useState();
    const [isEdit, setIsEdit] = useState(false);

    const modal = useRef();
    useEffect(() =>{
        async function fetchData(){
            let data = await GetAllArchetypes();
            setArchetypes(data);
        }
        fetchData();
    }, [])

    function handleOnEdit(){
        console.log("Edit archetype: ", selectedArchetype);
        // Create a new object to avoid mutating the state directly
        const databaseObject = {
            ...selectedArchetype,}
        setInputValue(prevState => ({
            ...prevState,
            ...selectedArchetype,
            Attributes: selectedArchetype.attributes.map(attr => ({
                ...attr,
                value: attr.value || 0, // Ensure value is set to 0 if undefined
            })),
        }));
        setIsEdit(true);
        modal.current.close(); // Close the modal after editing
        
    }

    function handleOnChange(field, value){
        setInputValue(prev => ({
            ...prev,
            [field]: value,
        }));
        console.log(value);
    }

    function handleAttributeChange(attributeId, value){
        console.log(`attribuite change ${attributeId}`);
        setInputValue(prev => ({
            ...prev,
            Attributes: prev.Attributes.map(attr => 
                attr.AttributeId === attributeId 
                    ? { ...attr, value: value }  // Ensure a new object is created
                    : attr
            ),
        }));
        console.log(archetypeRequest);
    }

    async function EditArchetype(event) {
        event.preventDefault(); // Prevent default form submission behavior
        console.log(archetypeRequest);
        let response = await PutArchetype(archetypeRequest); // Ensure this updates the archetype in the backend
        console.log("Response from PUT: ", response);
        setArchetypes(prev => 
                prev.map(archetype => 
                    archetype.id === archetypeRequest.id ? archetypeRequest : archetype
                )
        );
            
        setInputValue({...baseFormState}); // Reset the form state to the base state
    
        setIsEdit(false);
        
        
    }

    async function ViewArchetype(id){
        let newArchetype = await GetArchetype(id);
        setSelectedArchetype(newArchetype);
        modal.current.open();
        console.log("View archetype: ", newArchetype);
    }

    async function CreateArchetype(event) {
        event.preventDefault(); // Prevent default form submission behavior
        console.log(archetypeRequest);
        let id = await PostArchetype(archetypeRequest);
        let newArchetype = await GetArchetype(id);
        setArchetypes(prev => [...prev, newArchetype]);
        setInputValue(baseFormState);
        
    }
    async function HandleDeleteArchetype(id){
        console.log("Delete archetype: ", id);
        let response = await DeleteArchetype(id);
        console.log("Response from DELETE: ", response);
        setArchetypes(prev => prev.filter(archetype => archetype.id !== id));
        setInputValue({...baseFormState});
        setSelectedArchetype(null);
    }

    return(
        <>
            <CustomModal opened = {isOpen} ref={modal} >
                <ArchetypeView archetype={selectedArchetype} onEdit = {handleOnEdit} onDelete={HandleDeleteArchetype}/>
            </CustomModal>
            <Section>
                <h2 className="text-2xl font-bold underline">Archetype Form</h2>
            </Section>
            <div className='md:flex justify-between'>
                <Section classes='md:order-2 md:w-2/3'>
                    <h2 className="text-2xl font-bold underline">Archetype Form</h2>
                    <form onSubmit={isEdit ? EditArchetype : CreateArchetype}>
                        <section className='flex justify-between'>
                            <FormInput label="Archetype Name" labelFor = "name" required type="text" value={archetypeRequest.name} onChange={(event) => handleOnChange("name", event.target.value)} id="name"/>
                            <FormInput textarea label = "Description" labelFor = "description" required type="text" value={archetypeRequest.description} onChange={(event) => handleOnChange("description", event.target.value)} id="description"/>
                        </section>
                        
                        <hr className='text-lime-800'/>
                    
                        <section className='flex justify-between'>
                            <FormInput label = "Wound Threshold" labelFor = "woundThreshold" required type="number" value={archetypeRequest.woundThreshold} onChange={(event) => handleOnChange("woundThreshold", parseInt(event.target.value))} id="woundThreshold"/>
                            <FormInput label = "Strain Threshold" labelFor = "strainThreshold" required type="number" value={archetypeRequest.strainThreshold} onChange={(event) => handleOnChange("strainThreshold", parseInt(event.target.value))} id="strainThreshold"/>
                            <FormInput label = "Starting Xp" labelFor = "startingExperience" required type="text" value={archetypeRequest.startingExperience} onChange={(event) => handleOnChange("startingExperience", event.target.value)} id="startingExperience"/>
                            
                        </section>
                        
                        <hr className='text-lime-800'/>
                        
                        <section className='flex justify-between'>
                            <FormInput label = "Starting Skills" labelFor = "startingSkills" required type="text" value={archetypeRequest.startingSkills} onChange={(event) => handleOnChange("startingSkills", event.target.value)} id="startingSkills"/>
                            <FormInput textarea label = "Special Ability" labelFor = "specialAbility" required type="text" value={archetypeRequest.archetypeAbility} onChange={(event) => handleOnChange("archetypeAbility", event.target.value)} id="specialAbility"/>
                        </section>


                        
                        <hr className='text-lime-800'/>
                        <section className='flex justify-between flex-wrap'>
                            {archetypeRequest.Attributes.map((attribute, index) => (
                                <Attributes 
                                key={index} 
                                attributeName={attribute.name} 
                                attributeChange={(event) => handleAttributeChange(index + 1, Number(event.target.value))}
                                attributeValue={attribute.value} 
                                required
                            />
                            ))}
                        </section>
                        <SubmitButton type="submit" classes=' h-10'>Submit</SubmitButton>
                    </form>
                </Section>
                <Section classes='md:order-1 md:w-1/3' data-testid="fetch-section">
                    <h2 className="text-xl font-bold underline">Archetypes</h2>
                    <ul>
                        {archetypes.map((archetype) => (
                            <li key={archetype.id} className='flex justify-center'>
                                <button 
                                    className='hover:bg-slate-600 flex-1 bg-stone-300 text-stone-900 p-3 rounded-md shadow-md shadow-slate-700 m-1 mt-5'
                                    onClick={() => ViewArchetype(archetype.id)}
                                >{archetype.name}</button>
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>
        </>
        
    )
}