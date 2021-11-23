const name = document.getElementById("name");
const identification= document.getElementById("identification");
const lastName = document.getElementById("lastName");
const indice = document.getElementById("index");
const form = document.getElementById("form");
const btnSave = document.getElementById("btnSave");
const listOwners = document.getElementById("list-owners");
const url = "http://localhost:5000/owners";

let owners = [];

async function showOwners(){
    try{
        const answer = await fetch(url);
        const serverOwners = await answer.json();
        if(Array.isArray(serverOwners)){
            owners = serverOwners;
        }
        if(owners.length>0){
            const htmlOwners = owners.map((owner, index)=>` 
                <tr>
                <th scope="row">${index}</th>
                    <td>${owner.identification}</td>
                    <td>${owner.name}</td>
                    <td>${owner.lastName}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info edit" ><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger deleteOwner"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>`).join("");
                listOwners.innerHTML = htmlOwners;
                Array.from(document.getElementsByClassName("edit")).forEach((btnEdit, index)=>btnEdit.onclick = edit(index));
                Array.from(document.getElementsByClassName("deleteOwner")).forEach((btnDelete, index)=>btnDelete.onclick = deleteOwner(index));
                return;
        }
        listOwners.innerHTML = ` <tr>
                    <td colspan="5">No owners</td>
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
            owners[indice.value] = data;
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
            showOwners();
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
        const owner = owners[index];
        indice.value = index;
        name.value = owner.name;
        lastName.value =owner.lastName;
        identification.value = owner.identification;
    }
}
function resetModal(){

    indice.value = '';
    name.value = '';
    lastName.value = '';
    identification.value = '';
    btnSave.innerHTML = 'Save';
}

function deleteOwner(indice){
    const urlSend = `${url}/${indice}`;
    return async function clickDelete(){
        try{
            const answer = await fetch(urlSend, {
                method: 'DELETE',            
            }); 
            if(answer.ok){
                showOwners();
                resetModal();
            }    
        }catch(error){
            console.log({error});
            $(".alert").show();
        }       
    }
}

showOwners();

form.onsubmit = sendData;
btnSave.onclick = sendData;
