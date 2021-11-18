const country = document.getElementById("country");
const name = document.getElementById("name");
const IDs= document.getElementById("ID");
const lastName = document.getElementById("lastName");
const indice = document.getElementById("index");
const form = document.getElementById("form");
const btnSave = document.getElementById("btnSave");
const listOwners = document.getElementById("list-owners");

let owners = [
    {
        name: "Sam",
        lastName: "Kolder",
        country: "Argentina",
        IDs: "999321",
    },
    {
        name: "Gretta",
        lastName: "Anacleta",
        country: "Italy",
        IDs: "7845233",
    }
];

function showOwners(){
    const htmlOwners = owners.map((owner, index)=>` 
        <tr>
        <th scope="row">${index}</th>
            <td>${owner.IDs}</td>
            <td>${owner.country}</td>
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
            owners[indice.value] = data;
            break;
        default:
                owners.push(data);
            break;
    }
    showOwners();
    resetModal();
}
function edit(index){
    return function whenIClick(){

        btnSave.innerHTML = 'Edit';
        $('#exampleModal').modal('toggle');
        const owner = owners[index];
        indice.value = index;
        name.value = owner.name;
        lastName.value =owner.lastName;
        country.value = owner.country;
        IDs.value = owner.IDs;
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

function deleteOwner(indice){
    return function clickDelete(){
        console.log('index', indice);
        owners = owners.filter((owner, indiceOwner)=>indiceOwner !== indice);
        
        showOwners();
    }
}
showOwners();

form.onsubmit = sendData;
btnSave.onclick = sendData;
