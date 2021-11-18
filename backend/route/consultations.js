module.exports = function consultationsHandler(consultations){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(consultations[data.id]){
                    return callback(200, consultations[data.id]);        
                }
                return callback(404, {mensaje: `consultations con indice ${data.id} non encontrado`});
            }
            callback(200,consultations);
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
                return callback(404, {mensaje: `consultations con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(consultations[data.id]){
                    consultations = consultations.filter(
                        (_consultation, id)=>id != data.id);
                    return callback(204, {mensaje: `elemente con id ${data.id} eliminada`});        
                }
                return callback(404, {mensaje: `consultations con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        
    }   
    
}