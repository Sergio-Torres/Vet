const means = require('./means');
const pets = require('./route/pets');
const vets = require('./route/vets');
const owners = require('./route/owners');
const consultations = require('./route/consultations');


module.exports ={
    ruta: (data, callback) =>{
        callback(200, {mensaje: 'this is the /ruta'});
    },
    pets: pets(means.pets),
    vets: vets(means.vets),  
    owners: owners(means.owners),
    consultations: consultations(means),
    
    noEncontrado:(data, callback)=>{
        callback(404, {mensaje: 'no found'});
    }
};
