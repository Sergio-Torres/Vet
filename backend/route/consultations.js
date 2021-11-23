module.exports = function consultationsHandler({consultations, vets, pets}){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(consultations[data.id]){
                    return callback(200, consultations[data.id]);        
                }
                return callback(404, {message: `Consultation with index ${data.id} no found `});
            }
            //list all queries
            const consultationWithRelations = consultations.map((consultation)=>(
                {...consultation, 
                    pet: pets[consultation.pet],
                    vet: vets[consultation.vet] 
                }
            ));
            callback(200,consultationWithRelations);
        },
        post:(data, callback)=>{ //handlers
            let newConsultation = data.payload;
            newConsultation.dateCreation = new Date();
            newConsultation.dateEdit =null;
            consultations = [...consultations, newConsultation];
            callback(201,newConsultation);    
        },
        put:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(consultations[data.id]){
                    let {dateCreation} = consultations[data.id];
                    consultations[data.id] ={
                        ...data.payload,
                        dateCreation,
                        dateEdit: new Date()
                    };
                    return callback(200,consultations[data.id]);        
                }
                return callback(404, {message: `Consultation with index ${data.id} no found `});
            }
            callback(400, {message:"id has not been sent"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(consultations[data.id]){
                    consultations = consultations.filter(
                        (_consultation, id)=>id != data.id);
                    return callback(204, {message: `Element with index ${data.id} removed`});        
                }
                return callback(404, {message: `Consultation with index ${data.id} no found `});
            }
            callback(400, {message:"id has not been sent"});
        },
        
    }   
    
}