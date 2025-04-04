const URL = "https://142.154.187.169/api/Character/Skill";

export async function GetAllSkills(){
    try{
        const response =  await fetch(URL);
        const retData = await response.json();
        if(!response.ok){
            return [];
        }
        console.log("RETURNED RESPONSE DATA:",response);
        console.log("RETURNED API DATA:",retData);
        return retData;
    }
    catch(e){
        return [];
    }
 
}

export async function GetSkill(id){
    const response =  await fetch(`${URL}/${id}`);
    const retData = await response.json();
    if(!response.ok){
        return null;
    }
    return retData;
}

export async function PostSkill(skill){
    let skillString = JSON.stringify(skill)
    console.log(skillString);
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: skillString
    });
    const retData = await response.json();
    if(!response.ok){
        return null;
    }
    return retData;
}

export async function PutSkill(skill){
    let skillString = JSON.stringify(skill)
    console.log(skillString);
    const response = await fetch(`${URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: skillString
    });
    console.log("PUT response: ", response);
    if(!response.ok){
        return null;
    }
    return response;
}

export async function DeleteSkill(id){
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    });
    if(!response.ok){
        return null;
    }
    return response;
}