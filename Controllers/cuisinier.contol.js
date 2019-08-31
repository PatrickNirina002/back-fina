
const Profile = require('../Models/cuisinier');
//const bcrypt = require('bcryptjs')
const fs = require('fs');

exports.creer = (req, res) => {
    if(!req.body.nom) {
        
        console.log('console.log 2 '+req.body.nom);
        
        
        return res.status(400).send({
            message: "profil content can not be empty"
            
        });
    }
    
    Profile.find()
    .then(user => {
        //autoincrement
        let idautom;
        if(user.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(user[user.length - 1]._id) + 1
        }
    const profil = new Profile({   
             
        _id: idautom,
        nom: req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email
 
    });

    
    profil.save()
    .then(() => {
        Profile.find()
        .then(data=>{
            res.send(data);
            console.log(data);
            
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
})
};

exports.findAl = (req, res) => {   
    Profile.find()
    .then(users => {    
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};


// Find a single profil with a profilId
// exports.findOne = (req, res) => {
//     var a=parseInt(req.params.profilId)
//     Profile.find()
//     .then(profilchoix => {
//         console.log(profilchoix,req.params.profilId) 
//         var tab=[]
//         for(let i=0;i<profilchoix.length;i++){
//             if(profilchoix[i].idreceveur==req.params.profilId) {
//                 tab.push(profilchoix[i])
//                 }
//             else if(profilchoix[i].idenvoyeur==req.params.profilId)    
//                 {
//                     tab.push(profilchoix[i])
//                     };       
//             }
//             res.send(tab);   
//         })
//       .catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "profil not found with id " + req.params.profilId
//             });                
//         }
//         return res.status(500).send({
//             message: "Something wrong retrieving profil with id " + req.params.profilId
//         });
//     });
// };
// exports.create = (req, res) => {
//     Profile.findById(req.params._id).then(user=>{
//     if(!req.body.titre || !req.body.description) {
//         console.log('console.log 1 '+req.file);
        
//         console.log('console.log 2 '+req.body.nom);
        
        
//         return res.status(400).send({
//             message: "profil content can not be empty"
            
//         });
//     }
//     if(!user){
//         res.send("introuvable")
//     }
//     else{
//     Profile.find()
//     .then(use => {
//         //autoincrement
//         let idautom;
//         if(use.length == 0){
//             idautom = 0
//         }else {
//             idautom = parseInt(use[use.length - 1]._id) + 1
//         }
        
//         // //images
//         //let imageFile = req.files.photo_profil;
//         //console.log('inona ny ato o!'+imageFile)
//         // let nomImage = idautom
//         // res.setHeader('Content-Type', 'text/plain');

//         // imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
//         //   if (err) {
//         //     return res.status(500).send(err);
//         //   }
          
          
//         //   //res.send({file:`public/${nomImage }.jpg`});
          
          
//         // });
        
        
        
//         //console.log('image file '+req.body.filename)
//     const profil = new Profile({   
             
//         _id: idautom,
//         id2:use._id,
//         titre: req.body.titre , 
//         description: req.body.description,
//         date: req.body.date,
//         debut: req.body.debut,
//         dure: req.body.dure,
//         place_dispo: req.body.place_dispo,
//         place_reserve: req.body.place_reserve,
//         prix: req.body.prix,
//         //photo_profil:'' + nomImage +'.jpg'
//     });

  

//     // Save p in the database
//     profil.save()
//     .then(() => {
//         Profile.find()
//         .then(data=>{
//             res.send(data);
//         })
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while creating the profil."
            
//         });
//     });
// })
//     }
// });
// }