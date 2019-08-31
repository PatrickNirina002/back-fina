
const Profile = require('../Models/article');
const bcrypt = require('bcryptjs')
const fs = require('fs');

//Create new profil
exports.create = (req, res) => {
    if(!req.body.titre || !req.body.description) {
        console.log('console.log 1 '+req.file);
        
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
        
        // //images
        let imageFile = req.files.photo_profil;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = idautom
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          
          
          //res.send({file:`public/${nomImage }.jpg`});
          
          
        });
        
        
        
        //console.log('image file '+req.body.filename)
    const profil = new Profile({   
             
        _id: idautom,
        titre: req.body.titre , 
        description: req.body.description,
        date: req.body.date,
        debut: req.body.debut,
        dure: req.body.dure,
        place_dispo: req.body.place_dispo,
        place_reserve: req.body.place_reserve,
        prix: req.body.prix,
       // photo_profil:'' + nomImage +'.jpg'
    });

  

    // Save p in the database
    profil.save()
    .then(() => {
        Profile.find()
        .then(data=>{
            res.send(data);
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
})
};

exports.findAll = (req, res) => {   
    Profile.find()
    .then(users => {    
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};

exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./Controllers/public/'+req.params.photo_profil)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("erreur be miitsy", e.stack);
    }
}

// Find a single profil with a profilId
exports.findOne = (req, res) => {
    Profile.findById(req.params.profilId)
    .then(profilchoix => {
        //console.log(unprofil) 
        if(!profilchoix) {
            return res.status(404).send({
                message: "profil not found with id" + req.params.profilId
            });            
        }
        else{  
            //profilchoix +=profilchoix;
            res.send(profilchoix);             
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "profil not found with id " + req.params.profilId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving profil with id " + req.params.profilId
        });
    });
};

// businessRoutes.route('/edit/:id')
// .get(function
    exports.edit= (req, res) =>{
    let id = req.params.id;
    Profile.findById(id, function (err, profil){
        res.json(profil);
    });
  };
//businessRoutes.route('/update/:id').post(function 
exports.editlist=(req, res)=> {
    Profile.findById(req.params.id, function(err, profil) {
    if (!profil)
      res.status(404).send("data is not found");
    else {
        profil.titre = req.body.titre;
        profil.description = req.body.description;
        profil.date = req.body.date;
        profil.debut = req.body.debut;
        profil.dure = req.body.dure;
        profil.place_dispo= req.body.place_dispo,
        profil.place_reserve= req.body.place_reserve,
        profil.prix= req.body.prix,
        profil.save().then(data => {
          res.json(data);
          console.log(data);
          
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
};
//poster pour lui même
