const country = document.getElementById("country");
const name = document.getElementById("name");
const IDs= document.getElementById("ID");
const lastName = document.getElementById("lastName");
const indice = document.getElementById("index");
const form = document.getElementById("form");
const btnSave = document.getElementById("btnSave");
const listVets = document.getElementById("list-vets");

let vets = [
    {
        name: "Saya",
        lastName: "Mc' Donald",
        country: "Colombia",
        IDs: "01300444",
    },
    {
        name: "Andres",
        lastName: "Galindo",
        country: "Ecuador",
        IDs: "08555123",
    }
];

function showVets(){
    const htmlVets = vets.map((vet, index)=>` 
        <tr>
        <th scope="row">${index}</th>
            <td>${vet.IDs}</td>
            <td>${vet.country}</td>
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
}

function sendData(event){
    event.preventDefault();
    const data = {
        name : name.value,
        lastName : lastName.value,
        country: country.value,
        IDs : IDs.value,
    };
    const action = btnSave.innerHTML;
    switch(action){
        case 'Edit':
            vets[indice.value] = data;
            break;
        default:
                vets.push(data);
            break;
    }
    showVets();
    resetModal();
}
function edit(index){
    return function whenIClick(){

        btnSave.innerHTML = 'Edit';
        $('#exampleModal').modal('toggle');
        const vet = vets[index];
        indice.value = index;
        name.value = vet.name;
        lastName.value =vet.lastName;
        country.value = vet.country;
        IDs.value = vet.IDs;
    }
}
function resetModal(){

    indice.value = '';
    name.value = '';
    lastName.value = '';
    country.value = '';
    IDs.value = '';
    btnSave.innerHTML = 'Save';
}

function deleteVet(indice){
    return function clickDelete(){
        console.log('index', indice);
        vets = vets.filter((vet, indiceVet)=>indiceVet !== indice);
        
        showVets();
    }
}
showVets();

form.onsubmit = sendData;
btnSave.onclick = sendData;
