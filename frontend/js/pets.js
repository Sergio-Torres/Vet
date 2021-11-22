const listPet = document.getElementById("list-pets");
const species = document.getElementById("species");
const name = document.getElementById("name");
const owner = document.getElementById("owner");
const indice = document.getElementById("index");
const form = document.getElementById("form");
const btnSave = document.getElementById("btnSave");
const url = "http://localhost:5000/pets";

let pets = [];

async function showPets(){
    try{
        const answer = await fetch(url);
        const serverPets = await answer.json();
        if(Array.isArray(serverPets)){
            pets = serverPets;
        }
        if(pets.length>0){
            const htmlPets = pets.map((pet, index)=>` 
            <tr>
            <th scope="row">${index}</th>
                <td>${pet.species}</td>
                <td>${pet.name}</td>
                <td>${pet.owner}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info edit" ><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger deletePet"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>`).join("");
            listPet.innerHTML = htmlPets;
            Array.from(document.getElementsByClassName("edit")).forEach((btnEdit, index)=>btnEdit.onclick = edit(index));
            Array.from(document.getElementsByClassName("deletePet")).forEach((btnDelete, index)=>btnDelete.onclick = deletePet(index));
            return;
        }

        listPet.innerHTML = ` <tr>
                <td colspan="5">No pets</td>
            </tr>`;
        
        
    }catch(error){
        throw error;
    }
    
   
}

async function sendData(event){
    event.preventDefault();
    try{
        const data = {
            species : species.value,
            name : name.value,
            owner : owner.value
        };
        let method = "POST";
        let urlSend = url;
        const action = btnSave.innerHTML;
        
        if(action==='Edit'){       
            method = "PUT";
            pets[indice.value] = data;
            urlSend = `${url}/${indice.value}`;
        }
        const answer = await fetch(urlSend, {
            method,
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        if(answer.ok){
            showPets();
            resetModal();
        }

    }catch(error){
        throw error;
    }
    
    
}
function edit(index){
    return function whenIClick(){

        btnSave.innerHTML = 'Edit';
        $('#exampleModal').modal('toggle');
        const pet = pets[index];
        name.value = pet.name;
        owner.value = pet.owner;
        species.value = pet.species;
        indice.value = index;
    }
}
function resetModal(){

    name.value = '';
    owner.value = '';
    species.value = '';
    indice.value = '';
    btnSave.innerHTML = 'Save';
}

function deletePet(indice){
    const urlSend = `${url}/${indice}`;
    return async function clickDelete(){
        try{
            const answer = await fetch(urlSend, {
                method: 'DELETE',            
            }); 
            if(answer.ok){
                showPets();
                resetModal();
            }    
        }catch(error){
            throw error;
        }       
    }
}
showPets();
//call fetch API


form.onsubmit = sendData;
btnSave.onclick = sendData;
