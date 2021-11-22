module.exports = function ownersHandler(owners){
    return {
        get:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(owners[data.id]){
                    return callback(200, owners[data.id]);        
                }
                return callback(404, {message: `Owner with index ${data.id} no found`});
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
                return callback(404, {message: `Owner with index ${data.id} no found`});
            }
            callback(400, {message:"id has not been sent"});
        },
        delete:(data, callback)=>{ //handlers
            if(typeof data.id !== "undefined"){
                if(owners[data.id]){
                    owners = owners.filter(
                        (_owner, id)=>id != data.id);
                    return callback(204, {message: `Element with index ${data.id} removed`});        
                }
                return callback(404, {message: `Owner with index ${data.id} no found`});
            }
            callback(400, {message:"id has not been sent"});
        },
        
    }   
    
}