module.exports = {    
    pets:[   
        {species:'Dog', name:'Trusqui', owner:'Donald'},
        {species:'Cat', name:'Simon', owner:'Patric'},
        {species:'Bird', name:'Noir', owner:'Miriam'},
        ],   
    vets:[   
        {identification:'1003402', name:'Lucia', lastName:'Trump'},
        {identification:'100322', name:'Andu', lastName:'Gregor'},
        {identification:'105502', name:'Asta', lastName:'Endo'},
        {identification:'1004567', name:'Elza', lastName:'Scarlett'},
        ],
    owners:[   
        {identification:'2003402', name:'Mirame', lastName:'Uzumaki'},
        {identification:'200322', name:'tow', lastName:'zero'},
        {identification:'205502', name:'ana', lastName:'cleta'},
        {identification:'2004567', name:'wiz', lastName:'khalifa'},
        ],
    consultations:[   
               {
            pet: 0, 
            vet:0,  
            dateCreation: new Date(),
            dateEdit: new Date(),
            record: '',
            diagnosis: '',
        } 
         ]   
}
