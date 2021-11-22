const name = document.getElementById("name");
const identification= document.getElementById("identification");
const lastName = document.getElementById("lastName");
const indice = document.getElementById("index");
const form = document.getElementById("form");
const btnSave = document.getElementById("btnSave");
const listVets = document.getElementById("list-vets");
const url = "http://localhost:5000/vets";
let vets = [];

async function showVets(){
    try{
        const answer = await fetch(url);
        const serverVets = await answer.json();
        if(Array.isArray(serverVets)){
            vets = serverVets;
        }
        if(vets.length>0){
            const htmlVets = vets.map((vet, index)=>` 
                <tr>
                <th scope="row">${index}</th>
                    <td>${vet.identification}</td>
                    <td>${vet.name}</td>
                    <td>${vet.lastName}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info edit" ><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger deleteVet"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>`).join("");
                listVets.innerHTML = htmlVets;
                Array.from(document.getElementsByClassName("edit")).forEach((btnEdit, index)=>btnEdit.onclick = edit(index));
                Array.from(document.getElementsByClassName("deleteVet")).forEach((btnDelete, index)=>btnDelete.onclick = deleteVet(index));
                return;
        }
        listVet.innerHTML = ` <tr>
                    <td colspan="5">No veterinarians</td>
                </tr>`;
    }catch(error){
        console.log({error});
        $(".alert").show();
    }
    
}

async function sendData(event){
    event.preventDefault();
    try{
        const data = {
            name : name.value,
            lastName : lastName.value,
            identification : identification.value,
        };
        const action = btnSave.innerHTML;
        let urlSend = url;
        let method = 'POST';
        if(action==='Edit'){            
            vets[indice.value] = data;
            urlSend += `/${indice.value}`;
            method = 'PUT';
            
        }
        const answer = await fetch(urlSend, {
            method,
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        if(answer.ok){
            showVets();
            resetModal();
        }

    }catch(error){
        console.log({error});
        $(".alert").show();
    }    
    
}
function edit(index){
    return function whenIClick(){

        btnSave.innerHTML = 'Edit';
        $('#exampleModal').modal('toggle');
        const vet = vets[index];
        indice.value = index;
        name.value = vet.name;
        lastName.value =vet.lastName;
        identification.value = vet.identification;
    }
}
function resetModal(){

    indice.value = '';
    name.value = '';
    lastName.value = '';
    
    identification.value = '';
    btnSave.innerHTML = 'Save';
}

function deleteVet(indice){
    const urlSend = `${url}/${indice}`;
    return async function clickDelete(){
        try{
            const answer = await fetch(urlSend, {
                method: 'DELETE',            
            }); 
            if(answer.ok){
                showVets();
                resetModal();
            }    
        }catch(error){
            console.log({error});
            $(".alert").show();
        }       
    }
}
showVets();

form.onsubmit = sendData;
btnSave.onclick = sendData;
