const listConsultations = document.getElementById("list-consultations");
let consultations =[];
const url = "http://localhost:5000/consultations";

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
    try{
        const answer = await fetch(url);
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