module.exports = function vetsHandler(vets){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(vets[data.id]){
                    return callback(200, vets[data.id]);        
                }
                return callback(404, {message: `Vet with index ${data.id} no found`});
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
                return callback(404, {message: `Vet with index ${data.id} no found`});
            }
            callback(400, {message:"id has not been sent"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(vets[data.id]){
                    vets = vets.filter(
                        (_vet, id)=>id != data.id);
                    return callback(204, {message: `Element with index ${data.id} remove`});        
                }
                return callback(404, {message: `Vet with index ${data.id} no found`});
            }
            callback(400, {message:"id has not benn sent"});
        },
        
    }   
    
}