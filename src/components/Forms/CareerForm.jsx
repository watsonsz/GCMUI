import Section from "../BaseComponents/Section";
import FormInput from '../BaseComponents/FormInput';
import Button from "../BaseComponents/Button";
import { useState } from "react";
const baseFormState = {
    name: "",
    description: "",
    specializations: [
        
    ]
};


export default function CareerForm({...props}){
    const [careerRequest, setCareerRequest] = useState(baseFormState);
    
    function handleOnChange(field, value){
        setCareerRequest(prev => ({
            ...prev,
            [field]: value,
        }));
        console.log(value);
    }
    return <div className="md:flex justify-between">
        <Section classes="md:order-2 md:w-2/3">
            <h2 className="text-2xl font-bold underline">Career Form</h2>
            <section className='flex justify-between'>
                <FormInput label="Career Name" labelFor = "name" required type="text" value={careerRequest.name} onChange={(event) => handleOnChange("name", event.target.value)} id="name"/>
                <FormInput textarea label = "Description" labelFor = "description" required type="text" value={careerRequest.description} onChange={(event) => handleOnChange("description", event.target.value)} id="description"/>
            </section>
            <hr className='text-lime-800'/>
            <h2 className = "text-xl font-bold underline">Specializations</h2>
            <section className='flex justify-center'>
                {careerRequest.specializations.length <= 0 && <div>
                    <p>No Specializations</p>
                    <Button onClick = "" >+ Add</Button>
                    </div>}
            </section>
        </Section>
        <Section classes="md:order-1 md:w-1/3">
        </Section>
    </div>
}