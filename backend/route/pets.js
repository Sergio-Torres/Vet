module.exports = function petsHandler(pets){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(pets[data.id]){
                    return callback(200, pets[data.id]);        
                }
                return callback(404, {message: `Pet with index ${data.id} no found`});
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
                return callback(404, {message: `Pet with index ${data.id} no found`});
            }
            callback(400, {message:"id has not been sent"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(pets[data.id]){
                    pets = pets.filter(
                        (_pet, id)=>id != data.id);
                    return callback(204, {message: `Element with index ${data.id} removed`});        
                }
                return callback(404, {message: `Pet with index ${data.id} no found`});
            }
            callback(400, {message:"id has not been sent"});
        },
        
    }   
    
}

