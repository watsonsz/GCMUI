import React from 'react';
import FormInput from "./BaseComponents/FormInput";

export default function Attributes({attributeName, attributeChange, attributeValue}){
    return( 
        <FormInput label = {attributeName} labelFor = {attributeName} onChange = {attributeChange} type = "number" placeholder = "0" id={attributeName} value={attributeValue}/>
    
    )
}