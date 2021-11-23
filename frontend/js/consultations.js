const listConsultations = document.getElementById("list-consultations");
const pet = document.getElementById("pet");

let consultations =[];
let pets= [];
const url = "http://localhost:5000";

/*
    {
            pet: 0, 
            vet:0,  
            dateCreation: new Date(),
            dateEdit: new Date(),
            record: '',
            diagnosis: '',
    } 
*/

async function showConsultations(){
    const entity = 'consultations'
    try{
        const answer = await fetch(`${url}/${entity}`);
        const serverConsultations = await answer.json();
        if(Array.isArray(serverConsultations)){
            consultations = serverConsultations;
        }

        if(answer.ok){
            const htmlConsultations = consultations.map((consultation, index)=>
                `<tr>
                <th scope="row">${index}</th>
                    <td>${consultation.pet.name}</td>
                    <td>${consultation.vet.name} ${consultation.vet.lastName}</td>
                    <td>${consultation.diagnosis}</td>
                    <td>${consultation.dateCreation}</td>
                    <td>${consultation.dateEdit}</td>
                    <td>${consultation.record}</td>
                    
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info edit" ><i class="fas fa-edit"></i></button>
                        </div>
                    </td>
                </tr>`
                
            ).join("");
            listConsultations.innerHTML = htmlConsultations
            return;
        }
    }catch(error){
        throw error;
    }
}

showConsultations();

async function showPets(){
    const entity = 'pets'
    try{
        const answer = await fetch(`${url}/${entity}`);
        const serverPets = await answer.json();
        if(Array.isArray(serverPets)){
            pets= serverPets;
        }

        if(answer.ok){
            pets.forEach((_pet, index)=>{
                const actualOption = document.createElement("option");
                actualOption.innerHTML = _pet.name;
                actualOption.value = index;
                pet.appendChild(actualOption);
            })
        }
    }catch(error){
        throw error;
    }
}

showPets();