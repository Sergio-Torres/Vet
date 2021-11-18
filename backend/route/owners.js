module.exports = function ownersHandler(owners){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(owners[data.id]){
                    return callback(200, owners[data.id]);        
                }
                return callback(404, {mensaje: `owners con indice ${data.id} non encontrado`});
            }
            callback(200,owners);
        },
        post:(data, callback)=>{ //handlers
            owners.push(data.payload);
            callback(201,data.payload);    
        },
        put:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(owners[data.id]){
                    owners[data.id] = data.payload;
                    return callback(200,owners[data.id]);        
                }
                return callback(404, {mensaje: `owners con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(owners[data.id]){
                    owners = owners.filter(
                        (_owner, id)=>id != data.id);
                    return callback(204, {mensaje: `elemente con id ${data.id} eliminada`});        
                }
                return callback(404, {mensaje: `owners con indice ${data.id} non encontrado`});
            }
            callback(400, {mensaje:"id no enviada"});
        },
        
    }   
    
}