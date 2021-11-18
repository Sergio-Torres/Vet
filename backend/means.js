module.exports = {    
    pets:[   
        {Species:'Dog', Name:'trusqui', Owner:'Donald'},
        {Species:'Cat', Name:'trusqui2', Owner:'Donald2'},
        {Species:'Dog', Name:'trusqui3', Owner:'Donald3'},
        ],   
    vets:[   
        {id:'1003402', Name:'Lucia', LastName:'Trump'},
        {id:'100322', Name:'Andu', LastName:'Gregor'},
        {id:'105502', Name:'Asta', LastName:'Endo'},
        {id:'1004567', Name:'Elza', LastName:'Scarlett'},
        ],
    owners:[   
        {id:'2003402', Name:'Mirame', LastName:'Uzumaki'},
        {id:'200322', Name:'tow', LastName:'zero'},
        {id:'205502', Name:'ana', LastName:'cleta'},
        {id:'2004567', Name:'wiz', LastName:'khalifa'},
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
