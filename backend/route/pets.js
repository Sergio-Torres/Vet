module.exports = function petsHandler(pets){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(pets[data.id]){
                    return callback(200, pets[data.id]);        
                }
                return callback(404, {mensaje: `pets con indice ${data.id} non encontrado`});
            }
            callback(200,pets);
        },
        post:(data, callback)=>{ //handlers
            pets.push(data.payload);
            callback(201,data.payload);    
        },
        put:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(pets[data.id]){
                    pets[data.id] = data.payload;
                    return callback(200,pets[data.id]);        
                }
                return callback(404, {mensaje: `pets con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(pets[data.id]){
                    pets = pets.filter(
                        (_pet, id)=>id != data.id);
                    return callback(204, {mensaje: `elemente con id ${data.id} eliminada`});        
                }
                return callback(404, {mensaje: `pets con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        
    }   
    
}

