import { useState } from "react";
import Section from "../BaseComponents/Section";
import FormInput from "../BaseComponents/FormInput";
import SubmitButton from "../BaseComponents/SubmitButton";

const baseFormState = {
    name: "",
    description: "",
    activation: ""
};

export default function TalentForm({...props}){
    const [talentRequest, setTalentRequest] = useState({});
    function handleOnChange(field, value){
        setTalentRequest(prev => ({
            ...prev,
            [field]: value,
        }));
        console.log(value);
    }
    return(
        <>
        <Section>
            <h2 className="text-2xl font-bold underline">Talents</h2>
            <p>a blurb about the usage of Talents</p>
        </Section>
        <div className="md:flex justify-between">
            <Section classes="md:order-2 md:w-2/3">
                <h2 className="text-xl font-bold underline">Talent Form</h2>
                <form>
                <FormInput label="Talent Name" labelFor = "name" required type="text" value={talentRequest.name} onChange={(event) => handleOnChange("name", event.target.value)} id="name"/>
                <FormInput textarea label = "Description" labelFor = "description" required type="text" value={talentRequest.description} onChange={(event) => handleOnChange("description", event.target.value)} id="description"/>
                <FormInput label="Activation" labelFor = "activation" required type="text" value={talentRequest.activation} onChange={(event) => handleOnChange("activation", event.target.value)} id="activation"/>
                    <SubmitButton>Create Talent</SubmitButton>
                </form>
            </Section>
            <Section classes="md:order-1 md:w-1/3">
            </Section>
        </div>
        </>
    );
}
