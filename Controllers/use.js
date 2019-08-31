const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../Models/User');
const Atelier = require('../Models/article');
const Particulier = require('../Models/particulier');

const Prof = require('../Models/profile');

const Photo = require('../Models/photo');
const Rendre = require('../Models/rendre');
const Gestion = require('../Models/gestion');
const Desc = require('../Models/description');
const fs = require('fs');
//router.post('/register', function
exports.create= (req, res)=> {
 User.find().then(use=>{

    const { errors, isValid } = validateRegisterInput(req.body);
    let idautom;
    if(use.length == 0){
        idautom = 0
    }else {
        idautom = parseInt(use[use.length - 1]._id) + 1
    }

  
    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                _id:idautom,
                name: req.body.name,
                prenom:req.body.prenom,
                garage:req.body.garage,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});
}

//router.post('/login', 
exports.login= (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                prenom: user.prenom,
                                garage: user.garage,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        id: user.id,
                                        name: user.name,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
}

//router.get('/me', passport.authenticate('jwt', { session: false }), 
exports.logout=(req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}


exports.pro = (req, res) => {
    Prof.find().then(us=>{
        
        if(us.length==0){
            idautom=0
        }
        else{
            idautom=us[us.length-1]._id+1
        }
     }  
     )
    res.setHeader('Content-type', 'text/plain');
    User.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Prof.findOne(
                
                
                {id2:user._id}
                ).then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                if(use){
                    id2: 'profil exist'
                    console.log("exist profil");
                    
                }
                else{
                    console.log(req.params._id);
                    
                let Test = req.files.pho;
                let Couverture = req.files.image;
                //console.log('inona ny ato o!'+imageFile)
                let nomImage = idautom
                let Image = idautom
                res.setHeader('Content-Type', 'text/plain');
        
                Test.mv(`${__dirname}/public/pho/${nomImage }.jpg`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                  
                  
                  //res.send({file:`public/${nomImage }.jpg`});
                  
                  
                });  
                Couverture.mv(`${__dirname}/public/couverture/${Image }.jpg`, function(err) {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    
                    
                    
                    //res.send({file:`public/${nomImage }.jpg`});
                    
                    
                  });  
                
        
                        const atelier = new Prof({
                            _id:idautom,
                            id2:user._id,
                            name:user.name,
                            prenom:user.prenom,
                            garage:user.garage,
                            email:user.email,
                            description: req.body.description , 
                            lieu: req.body.lieu,
                            contact: req.body.contact,
                            pho:'' + nomImage +'.jpg',
                            image:'' + Image +'.jpg',
                            
                        });

                        // if(user.length==1){
                            atelier
                                .save()
                                .then(user => {
                                    res.json(user)
                                    console.log(user);
                                    console.log(user.length);
                                    
                                }).catch(use=>console.log(use)
                                ) 
                            // }else{
                            //     console.log("efa misy");
                            //     console.log(use.length);
                                
                                
                            // }
                            }
                                    
                                });   
        }
     
    })
}
exports.getProf=  (req, res) => {
       
    Prof.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}

exports.crea = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    Prof.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Atelier.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var idautom;
                if(use.length==0){
                    idautom=0
                }
                else{
                    idautom=use[use.length-1]._id+1
                }
                let imageFile = req.files.image;
                //console.log('inona ny ato o!'+imageFile)
                let nomImage = idautom
                res.setHeader('Content-Type', 'text/plain');
        
                imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                  
                  //res.send({file:`public/${nomImage }.jpg`});
                  
                  
                });
            
                  
                        const atelier = new Atelier({
                            _id:idautom,
                            id2:user._id,
                            nom:user.name,
                            photo:user.pho,
                            prenom:user.prenom,
                            garage:user.garage,
                            titre: req.body.titre , 
                            description: req.body.description,
                            prix: req.body.prix,
                            image:'' + nomImage +'.jpg',
                            rdv:0,
                            visibilite:true
                            
                        });
                      

   
  
                        
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                                console.log(user);
                                                
                                            }).catch(use=>console.log(use)
                                            ) 
                                    
                                });   
        }
     
    })
}
//router.get("/cuisinier/:_id",
exports.getCuis=  (req, res) => {
       
    Atelier.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}
//router.post("/particulier/:_id",
exports.rendre= (req,res)=>{
    Rendre.find().then(us=>{
        
        if(us.length==0){
            id=0
        }
        else{
            id=us[us.length-1]._id+1
        }
     }  
     )
  
       Atelier.findById(req.params._id).then(use=>{
            if(!use){
                res.send("non")
            }
            else{
                Rendre.findOne(
                    //    {
                    //     matricule: req.body.matricule
                    // }
                    ).then(user=>{
                        // if(user) {
                            
                        //     return res.status(400).json({
                        //         matricule: 'déja fait le rendez-vous'
                        //     });
                        // }
                        // else{   
                  
                const particulier = new Rendre({
                    _id:id,
                    id2:use._id,
                    id3:use.id2,
                    titre:use.titre,
                    matricule: req.body.matricule , 
                    nom: req.body.nom,
                    tel: req.body.tel,
                    datej: req.body.datej,
                    date: req.body.date,
                    
                    
                });
                    Atelier.findByIdAndUpdate(use._id, { _id:use.id,
                    id2:use.id2,
                    garage: use.garage,
                    titre: use.titre,
                    description: use.description,
                    prix: use.prix,
                    image:use.image,
                    rdv:use.rdv+1
                
                }).then(upd=>console.log("apdate"+upd)
                )
                                particulier
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    }); 

                                    //
                                // }
                                }); 
                                
                               
                 }
                                });         
                            
                            

                        // }); 
}

// exports.rendre = (req, res) => {
//     res.setHeader('Content-type', 'text/plain');
//     User.findById(req.params._id).then(user=>{
        
//         if(!user){
//             res.send("intouvable")
//         }
//         else{
//             Atelier.findById(req.params._id).then(ate=>{
//                 if(!ate){
//                     res.send("pas trouvé")
//                 }
//                 else{
//             Rendre.find().then(use=>{
//                 // const { errors, isValid } = validateRegisterInput2(req.body);
//                 var idautom;
//                 if(use.length==0){
//                     idautom=0
//                 }
//                 else{
//                     idautom=use[use.length-1]._id+1
//                 }
//                 let nomImage = idautom
//                 res.setHeader('Content-Type', 'text/plain');        
                  
//                         const atelier = new Rendre({
//                             _id:idautom,
//                             id2:user._id,
//                             titre:ate.titre,
//                             matricule: req.body.matricule , 
//                             nom: req.body.nom,
//                             tel: req.body.tel,
//                             datej: req.body.datej,
//                             date: req.body.date,
                            
//                         });

//                                         atelier
//                                             .save()
//                                             .then(user => {
//                                                 res.json(user)
//                                                 console.log(user);
                                                
//                                             }).catch(use=>console.log(use)
//                                             ) 
                                    
//                                 });   
//                             }
//                             })
//         }
     
//     })
// }

 exports.masquer= (req,res)=>{
    Atelier.findOneAndUpdate(req.params._id, { 
        visibilite:false
    
    },{new:true}).then(upd=>res.send(upd)
    )

}

//router.get("/atelieraffichier/:_id",
// exports.gestion=  (req,res)=>{
//     // Atelier.findById(req.params._id).then(use=>{
//         Atelier.findOneAndUpdate({_id:req.params._id}, {
         
//             visibilite:true
        
//         },{new:true}).then(upd=>res.send(upd)
//         )
//     // })
// }

exports.masquer = (req,res)=>{
    // router.get("/ateliermasquer/:_id",(req,res)=>{
    
        Atelier.findOneAndUpdate({_id:req.params._id}, { 
            visibilite:false
    
        },{new:true}).then(upd=>res.send(upd)
        )
    
    }
    
    exports.gestion = (req,res) => {
    // router.get("/atelieraffichier/:_id",(req,res)=>{
        Atelier.findOneAndUpdate({_id:req.params._id}, {
            visibilite:true
    
        },{new:true}).then(upd=>res.send(upd)
        )
    }
//router.get("/atelier",
//  exports.afficher=(req, res) => {
       
//     Atelier.find().then(user=>{
//                console.log(user);
               
//                 res.send(user)
            
           
        
     
//     })

//     Atelier.find().then(produit=>{
//         for(let i=0;i<produit.length;i++){
//           router.get("/hafa/"+produit[i].image,(req,res)=>{
//               var fs = require("fs")
//              console.log( "./Controllers/public/"+produit[i].image);
             
//              var image= fs.readFileSync("./Controllers/public/"+produit[i].image)
//     res.send(image)
//           })
//         }
//     })
          
// }
// exports.afficher = (req, res) => {   
//     Atelier.find()
//     .then(users => {    
//         res.send(users);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving profils."
//         });
//     });
// };
// exports.lireImage =(req, res) =>{
//     try {
//         let picture = fs.readFileSync('./Controllers/public/'+req.params.image)
//         res.write(picture)
//         res.end()
//     } catch (e) {
//         console.log("erreur be miitsy", e.stack);
//     }
//}
exports.findOneArticle = (req, res) => {
    try {
        let picture = fs.readFileSync('./Controllers/public/' + req.params.image)
        console.log('params: ', req.params.image);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}
exports.findAllArticle = (req, res) => {
    Atelier.find()
        .then(article => {
            console.log(article);
            
            res.send(article);
        }).catch(err => {
            res.status(500).send(article => {
                message: err.message || "Something wrong while retrieving profils."
            });
        });
};
exports.update = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.titre)
    if(!req.body.titre || !req.body.description) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params._id)
    let imageFile = req.files.image;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = req.params._id
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('tonga eto v nw')
    // Find and update eleve with the request body
    Atelier.findByIdAndUpdate(req.params._id, {
                            titre: req.body.titre , 
                            description: req.body.description,
                            prix: req.body.prix,
                            image:nomImage +'.jpg'

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};



exports.editebe= (req, res) =>{
    let id = req.params.id;
    Atelier.findById(id, function (err, profil){
        res.json(profil);
    });
  };





exports.photo = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    Prof.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Photo.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var idautom;
                if(use.length==0){
                    idautom=0
                }
                else{
                    idautom=use[use.length-1]._id+1
                }
                let File = req.files.profil;
                //console.log('inona ny ato o!'+imageFile)
                let nomImage = idautom
                res.setHeader('Content-Type', 'text/plain');
        
                File.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                  
                  //res.send({file:`public/${nomImage }.jpg`});
                  
                  
                });
            
                  
                        const atelier = new Photo({
                            _id:idautom,
                            id2:user._id,
                            profil:'' + nomImage +'.jpg',
                            // visibilite:true
                            
                        });
                      

   
  
                        if(user.length==1){
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                                console.log(user);
                                                
                                            }).catch(use=>console.log(use)
                                            ) 
                                        }
                        else{
                            res.send("non")
                            console.log("efa misy");
                            
                        }
                                    
                                });   
        }
     
    })
}
exports.getPhoto=  (req, res) => {
       
    Photo.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}
exports.findOneProfil = (req, res) => {
    try {
        let picture = fs.readFileSync('./Controllers/public/' + req.params.profil)
        console.log('params: ', req.params.profil);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}

exports.getRendre=  (req, res) => {
       
    Rendre.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id3==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}

exports.getPho=  (req, res) => {
       
    Prof.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}
exports.upd = (req, res) => {
    // Validate Request()
    console.log('ity ny '+req.body.name)
    if( !req.files.pho) {
        return res.status(400).send({
            message: "eleve content"
        });
    }
    console.log('ity n params'+req.params._id)
    let Test = req.files.pho;
        //console.log('inona ny ato o!'+Test)
        let nomImage = req.params._id
        res.setHeader('Content-Type', 'text/plain');

        Test.mv(`${__dirname}/public/pho/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('tonga eto v nw')
    // Find and update eleve with the request body
    Prof.findByIdAndUpdate(req.params._id, {
        // description: req.body.description,
                             pho:nomImage +'.jpg'

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};

exports.gerer = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    User.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Gestion.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var idautom;
                if(use.length==0){
                    idautom=0
                }
                else{
                    idautom=use[use.length-1]._id+1
                }
                  
                  
                
            
                  
                        const atelier = new Gestion({
                            _id:idautom,
                            id2:user._id,
                            matricule:req.body.matricule,
                            nom_pro:req.body.nom_pro,
                            type_rep:req.body.type_rep,
                            prix:req.body.prix
                            // visibilite:true
                            
                        });
                      

                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                                console.log(user);
                                                
                                            }).catch(use=>console.log(use)
                                            ) 
                                        
                     
                    });
                                    
                                }  
        })
}
exports.getGestion=  (req, res) => {
       
    Gestion.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}
exports.desc= (req,res)=>{
    Desc.find().then(us=>{
        
        if(us.length==0){
            id=0
        }
        else{
            id=us[us.length-1]._id+1
        }
     }  
     )
     Desc.findOne(
    //    {
    //     matricule: req.body.matricule
    // }
    ).then(user=>{
        // if(user) {
        //     return res.status(400).json({
        //         matricule: 'tu a déja fait le rendez-vous'
        //     });
        // }
        // else{
       Atelier.findById(req.params._id).then(use=>{
            if(!use){
                res.send("non")
            }
            else{
               
                  
                const particulier = new Desc({
                    _id:id,
                    id2:use._id,
                    id3:use.id2,
                    garage:use.garage,
                    titrej:use.titre,
                    descriptionj:use.description,
                    prix:use.prix,
                    rdv:use.rdv,
                    image:use.image,
                    titre:req.body.titre,
                    description: req.body.description 
                    
                    
                });
                
                                particulier
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    }); 

                                    //
                                
                               
                 }
                                });         
                            
                            

                        }); 
}
exports.getDesc=  (req, res) => {
       
    Desc.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}
exports.getrep=  (req, res) => {
       
    Atelier.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i]._id==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}
exports.getproclient=  (req, res) => {
       
    Prof.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })             
}

exports.getdescAd=  (req, res) => {
       
    Desc.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);
              
            }
           
        }
        if(tab.length>0){
            res.send(tab)   
        }
        else{
            res.send([])
         } 
        
     
    })           
}
exports.updDescription = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.titre)
    if(!req.body.titre || !req.body.description) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params._id)
   
        console.log('tonga eto v nw')
    // Find and update eleve with the request body
    Desc.findByIdAndUpdate(req.params._id, {
                            titre: req.body.titre , 
                            description: req.body.description

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};
exports.couverture = (req, res) => {
    try {
        let picture = fs.readFileSync('./Controllers/public/couverture/' + req.params.image)
        console.log('params: ', req.params.image);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}
exports.findOnePho = (req, res) => {
    try {
        let picture = fs.readFileSync('./Controllers/public/pho/' + req.params.pho)
        console.log('params: ', req.params.pho);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}
exports.delete=  (req, res) => {
       
    Desc.findByIdAndRemove(req.params._id, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });   
}
exports.deletegestion=  (req, res) => {
       
    Gestion.findByIdAndRemove(req.params._id, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });   
}
exports.updcouverture = (req, res) => {
    // Validate Request()
    console.log('ity ny '+req.body.name)
    if( !req.files.image) {
        return res.status(400).send({
            message: "eleve content"
        });
    }
    console.log('it'+req.params._id)
    let Test = req.files.image;
        //console.log('inona ny ato o!'+Test)
        let nomImage = req.params._id
        res.setHeader('Content-Type', 'text/plain');

        Test.mv(`${__dirname}/public/couverture/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('tonga')
    // Find and update eleve with the request body
    Prof.findByIdAndUpdate(req.params._id, {
        // description: req.body.description,
                             image:nomImage +'.jpg'

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};
exports.updategestion = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.nom_pro)
    if(!req.body.nom_pro || !req.body.matricule) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params._id)
        console.log('tonga eto v nw')
    Prof.findByIdAndUpdate(req.params._id, {
        nom_pro: req.body.nom_pro , 
                            matricule: req.body.matricule,
                            type_rep:req.body.type_rep,
                            prix: req.body.prix,
                            // image:nomImage +'.jpg'

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};

exports.updateProfil = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.nom_pro)
    if(!req.body.lieu || !req.body.garage) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params._id)
        console.log('tonga eto v nw')
    Prof.findByIdAndUpdate(req.params._id, {
        description: req.body.description , 
        lieu: req.body.lieu,
        contact:req.body.contact,
        garage: req.body.garage,
                            // image:nomImage +'.jpg'

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};