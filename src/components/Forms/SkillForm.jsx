import React from 'react';
import Section from "../BaseComponents/Section";
import FormInput from '../BaseComponents/FormInput';
import SubmitButton from "../BaseComponents/SubmitButton";
import { useState, useRef, useEffect } from "react";
import { GetAllSkills, GetSkill, PostSkill, PutSkill, DeleteSkill } from "../../Helpers/SkillHelper";
import CustomModal from "../BaseComponents/CustomModal";
import SkillView from "../SkillView";
const baseFormState = {
    id: null,
    name: "",
    description: "",
    relatedAttribute: 1,
    skillType: 0,
}
export default function SkillForm({isOpen, ...props}){
    const [skillRequest, setSkillRequest] = useState({...baseFormState});
    const [skills, setSkills]= useState([]);
    const [selectedSkill, setSelectedSkill] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const modal = useRef();
    useEffect(() =>{
        async function fetchData(){
            let data = await GetAllSkills();
            setSkills(data);
        }
        fetchData();
        }, [])

    function handleOnChange(name, value){
        setSkillRequest((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(skillRequest);
    }
    async function ViewSkill(id){
        let newSkill = await GetSkill(id);
        setSelectedSkill(newSkill);
        //modal.current.open();
    }

    async function handleSubmit(event){
        event.preventDefault();
        console.log(skillRequest);
        let id = await PostSkill(skillRequest);
        let newSkill = await GetSkill(id);
        setSkills(prev => [...prev, newSkill]);
        setSkillRequest(baseFormState);
    }

    function onHandleEdit(){
        setIsEditing(true);
        setSkillRequest(prevState => ({
            ...prevState,
            ...selectedSkill,
        }));
        //modal.current.close();
    }

    async function onHandleDelete(id){
        await DeleteSkill(id);
        setSkills(prev => prev.filter(skill => skill.id !== id));
        setSelectedSkill(null);
        modal.current.close();
        
    }

    async function handlePutSkill(event){
        event.preventDefault();
        console.log(skillRequest);
        await PutSkill(skillRequest);
        setSkills(prev => 
            prev.map(skill => 
                skill.id === skillRequest.id ? skillRequest : skill
        ));
        setSkillRequest(baseFormState);
        setIsEditing(false);
    }
    
    return(
        <>
        <CustomModal opened = {isOpen} ref = {modal}>
            <SkillView skill={selectedSkill} onEdit = {onHandleEdit} onDelete={onHandleDelete} />
        </CustomModal>
        <Section>
            <h2 className="text-2xl font-bold underline">Skills</h2>
            <p>a blurb about the usage of Skills</p>
        </Section>
        <div className="md:flex justify-between">
            <Section classes="md:order-2 md:w-2/3">
                <h2 className="text-xl font-bold underline">Skill Form</h2>
                <form onSubmit={isEditing ? handlePutSkill : handleSubmit}>
                    <FormInput label="Skill Name" labelFor = "name" required type="text" value={skillRequest.name} onChange={(event) => handleOnChange("name", event.target.value)} id="name"/>
                    <FormInput textarea label = "Description" labelFor = "description" required type="text" value={skillRequest.description} onChange={(event) => handleOnChange("description", event.target.value)} id="description"/>
                    <div className="flex justify-between">
                        <label htmlFor="relatedAttribute">Related Attribute</label>
                        <select className="border border-stone-200 radius-md mx-2" name="relatedAttribute" id="relatedAttribute" value={skillRequest.relatedAttribute} onChange={(event) => handleOnChange("relatedAttribute", Number(event.target.value))}>
                            <option className="text-stone-700" value="0">Select Attribute</option>
                            <option className="text-stone-700" value="1">Brawn</option>
                            <option className="text-stone-700" value="2">Agility</option>
                            <option className="text-stone-700" value="3">Intellect</option>
                            <option className="text-stone-700" value="4">Cunning</option>
                            <option className="text-stone-700" value="5">Willpower</option>
                            <option className="text-stone-700" value="6">Presence</option>
                        </select>
                        <label htmlFor="skillType">Skill Type</label>
                        <select className="border border-stone-200 radius-md mx-2" name="skillType" id="skillType" value={skillRequest.skillType} onChange={(event) => handleOnChange("skillType", Number(event.target.value))}>
                            <option className="text-stone-700" value="0">General</option>
                            <option className="text-stone-700" value="1">Combat</option>
                            <option className="text-stone-700" value="2">Technical</option>
                            <option className="text-stone-700" value="3">Social</option>
                        </select>
                    </div>
                    <SubmitButton>Create Skill</SubmitButton>
                </form>
            </Section>
            <Section classes="md:order-1 md:w-1/3">
            <h2 className="text-xl font-bold underline">Skills</h2>
                    {skills && <ul>
                        {skills.map((skill) => (
                            <li key={skill.id} className='flex justify-center'>
                                <button 
                                    className='hover:bg-slate-600 flex-1 bg-stone-300 text-stone-900 p-3 rounded-md shadow-md shadow-slate-700 m-1 mt-5'
                                    onClick={() => ViewSkill(skill.id)}
                                >{skill.name}</button>
                            </li>
                        ))}
                    </ul>}
            </Section>
        </div>
        </>
    )
}