const URL = "https://142.154.187.169:5231/api/Character/Archetypes";

export async function GetAllArchetypes(){
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

export async function GetArchetype(id){
    const response =  await fetch(`${URL}/${id}`);
    const retData = await response.json();
    if(!response.ok){
        return null;
    }
    return retData;
}

export async function PostArchetype(archetype){
    let archetypeString = JSON.stringify(archetype)
    console.log(archetypeString);
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: archetypeString
    });
    const retData = await response.json();
    if(!response.ok){
        return null;
    }
    return retData;
}

export async function PutArchetype(archetype){
    let archetypeString = JSON.stringify(archetype)
    console.log(archetypeString);
    const response = await fetch(`${URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: archetypeString
    });
    console.log("PUT response: ", response);
    if(!response.ok){
        return null;
    }
    return response;
}

export async function DeleteArchetype(id){
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok){
        return null;
    }
    return response;
}