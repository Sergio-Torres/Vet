const listConsultations = document.getElementById("list-consultations");
const btnClose = document.getElementById("btnClose");
const btnSave = document.getElementById("btnSave");
const indice = document.getElementById("index");
const pet = document.getElementById("pet");
const record = document.getElementById("record");
const diagnosis = document.getElementById("diagnosis");
const vet = document.getElementById("vet");
const form = document.getElementById("form");
let consultations =[];
let pets= [];
let vets= [];

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
                    
                    
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info edit" ><i class="fas fa-edit"></i></button>
                        </div>
                    </td>
                </tr>`
                
            ).join("");
            listConsultations.innerHTML = htmlConsultations;
            Array.from(document.getElementsByClassName("edit")).forEach((btnEdit, index)=>btnEdit.onclick = edit(index));

            return;
        }
    }catch(error){
        console.log({error});
        $(".alert-danger").show();
    }
}

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
        console.log({error});
        $(".alert-danger").show();
    }
}


async function showVets(){
    const entity = 'vets'
    try{
        const answer = await fetch(`${url}/${entity}`);
        const serverVets = await answer.json();
        if(Array.isArray(serverVets)){
            vets= serverVets;
        }

        if(answer.ok){
            vets.forEach((_vet, index)=>{
                const actualOption = document.createElement("option");
                actualOption.innerHTML = `${_vet.name} ${_vet.lastName}`;
                actualOption.value = index;
                vet.appendChild(actualOption); 
            })
        }
    }catch(error){
        console.log({error});
        $(".alert-danger").show();
    }
}

function edit(index){
    return function whenIClick(){
        btnSave.innerHTML = 'Edit';
        $('#exampleModal').modal('toggle');
        const consultation = consultations[index];
        indice.value = index;
        pet.value = consultation.pet.id;
        vet.value =consultation.vet.id;
        record.value = consultation.record;
        diagnosis.value = consultation.diagnosis;
    }
}
async function sendData(event){
    const entity = "consultations";
    event.preventDefault();
    try{
        const data = {        
            pet: pet.value,
            vet: vet.value,
            record: record.value,
            diagnosis:diagnosis.value,   
        };
        
        if(validation(data)===true){
            const action = btnSave.innerHTML;
            let urlSend = `${url}/${entity}`;
            let method = 'POST';
            if(action==='Edit'){            
                consultations[indice.value] = data;
                urlSend += `/${indice.value}`;
                method = 'PUT';
                
            }
            const answer = await fetch(urlSend, {
                method,
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: 'cors',
            });
        
            if(answer.ok){
                showConsultations();
                resetModal();
            }
            
            return;
        }
        $(".alert-warning").show();

    }catch(error){
        console.log({error});
        $(".alert-danger").show();
    }
    
}

function resetModal(){

    indice.value = '';
    pet.value = '';
    vet.value = '';
    diagnosis.value = '';
    record.value = '';
    btnSave.innerHTML = 'Save';
    document.getElementById('exampleModalLabel').innerHTML = 'New consultation';

    $("#exampleModal").modal("toggle");
}


function validation(data){
    if(typeof data !=='object') return false;
    let answer = true;
    for(let llave in data){
        if(data[llave].length === 0){
            //document.getElementById(llave).classList.add('is-invalid');
            answer = false;
        }/*
        else{
            document.getElementById(llave).classList.remove('is-invalid');
            document.getElementById(llave).classList.add('is-valid');

        }*/
    }
    return answer;
    
}

btnSave.onclick = sendData;

showConsultations();
showPets();
showVets();

