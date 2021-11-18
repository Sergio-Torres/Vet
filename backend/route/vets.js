module.exports = function vetsHandler(vets){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(vets[data.id]){
                    return callback(200, vets[data.id]);        
                }
                return callback(404, {mensaje: `vets con indice ${data.id} non encontrado`});
            }
            callback(200,vets);
        },
        post:(data, callback)=>{ //handlers
            vets.push(data.payload);
            callback(201,data.payload);    
        },
        put:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(vets[data.id]){
                    vets[data.id] = data.payload;
                    return callback(200,vets[data.id]);        
                }
                return callback(404, {mensaje: `vets con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(vets[data.id]){
                    vets = vets.filter(
                        (_vet, id)=>id != data.id);
                    return callback(204, {mensaje: `elemente con id ${data.id} eliminada`});        
                }
                return callback(404, {mensaje: `vets con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        
    }   
    
}