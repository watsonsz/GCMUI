import ArchetypeForm from './Forms/ArchetypeForm'
import CareerForm from './Forms/CareerForm'
import SkillForm from './Forms/SkillForm'
import TalentForm from './Forms/TalentForm'
export default function FormDisplay({formType, ...props}){
    if(formType === "Archetype"){
        return <ArchetypeForm {...props}/>
    }
    else if (formType === "Career"){
        return <CareerForm {...props}/>
    }
    else if (formType === "Talent"){
        return <TalentForm {...props}/>
    }
    else if (formType === "Skill"){
        return <SkillForm {...props}/>
    }
    else{
        return <p>No form Selected!</p>
    }
}