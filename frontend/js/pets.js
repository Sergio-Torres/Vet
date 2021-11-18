const listPet = document.getElementById("list-pets");
const species = document.getElementById("species");
const name = document.getElementById("name");
const owner = document.getElementById("owner");
const indice = document.getElementById("index");
const form = document.getElementById("form");
const btnSave = document.getElementById("btnSave");

let pets = [
    {
        species: "Cat",
        name: "machas",
        owner: "Andres",
    },
    {
        species: "Bird",
        name: "willybird",
        owner: "Sofia",
    }
];

function showPets(){
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
}

function sendData(event){
    event.preventDefault();
    const data = {
        species : species.value,
        name : name.value,
        owner : owner.value
    };
    const action = btnSave.innerHTML;
    switch(action){
        case 'Edit':
            pets[indice.value] = data;
            break;
        default:
                pets.push(data);
            break;
    }
    showPets();
    resetModal();
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
    return function clickDelete(){
        console.log('index', indice);
        pets = pets.filter((pet, indicePet)=>indicePet !== indice);
        showPets();
    }
}
showPets();

form.onsubmit = sendData;
btnSave.onclick = sendData;
