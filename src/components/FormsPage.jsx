import React from 'react';
import { useState } from 'react'
import FormDisplay from './FormDisplay'

export default function FormsPage(){
  const [selectedForm, setSelectedForm] = useState("Archetype");
  //const forms = ["Archetype", "Career", "Talent", "Skill", "Weapon", "Armor", "Equipment"];
  const forms = ["Archetype", "Skill"];
  function handleButtonClick(form){
    setSelectedForm(form);
  }
    return (
    <div id='form-selector'>
      <menu className='bg-stone-800 p-3 rounded-md shadow-md shadow-orange-800 m-1 flex justify-center' >
        {forms.map((form, index) => {
          const background = selectedForm === form ? 'bg-amber-600' : 'bg-orange-800' ;
          const classList = `hover:bg-amber-600 ${background} mx-2 w-20 rounded-md py-1` ;
          return <button className={classList} key = {index}  onClick={() => handleButtonClick(form)}>{form}</button>
        })}
      </menu>
      <FormDisplay className= 'bg-stone-800 p-3 rounded-md shadow-md shadow-orange-800 m-1 mt-5' formType={selectedForm}/>
    </div>
    );
}