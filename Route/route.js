const model = require('../Controllers/use');
    // app.get('/register/:id', notes.findOne);
const passport = require('passport');
var express = require('express')
var app = express.Router();
//Henry
// var Controller= require('../Controllers/postComment')
// var ControllerComms= require('../Controllers/getComment')
//var Controllers= require('../Controllers/tchat.contolleur')
//henry
// app.post('/postComment',Controller.PosteComment)
//    .get('/getComment/:id', ControllerComms.getComment)
// //mi-pa
// app.post('/message', Controllers.create);
//     app.get('/message', Controllers.findAll);
//     app.get('/profil/:profilId', Controllers.findOne);
const cuis = require('../Controllers/cuisinier.contol');  
app.post('/cuisinier',cuis.creer);
app.get('/cuisinier',cuis.findAl)

//nante  
app.post('/register/:_id',model.crea); 
app.get('/register/:_id',model.getCuis);
app.post('/register', model.create);
app.get('/me', passport.authenticate('jwt', { session: false }),model.logout);
 app.post('/login', model.login);
// app.post("/particulier/:_id",model.createparticulier);
app.get("/affichier/:_id",model.gestion);
app.get("/masquer/:_id",model.masquer);
app.get("/affichertous",model.findAllArticle);
app.get('/user/:image', model.findOneArticle);

app.put('/profil/:_id', model.update);

app.get('ateliere/:id',model.editebe)

app.post('/prof/:_id', model.pro);
app.get('/afficheprof/:_id', model.getProf);
app.post('/photo/:_id', model.photo);
app.get('/affichephoto/:_id', model.getPhoto);
app.get('/photo/:profil', model.findOneProfil);
app.post('/rendre/:_id', model.rendre);
app.get('/afficherendre/:_id', model.getRendre);

app.get('/affichepho/:_id', model.getPho);
app.get('/pic/:pho', model.findOnePho);
app.put('/profi/:_id', model.upd);
app.post('/gestion/:_id', model.gerer);
app.get('/affichegestion/:_id', model.getGestion);
app.post('/description/:_id', model.desc);
app.get('/affdescription/:_id', model.getDesc);
app.get('/selrep/:_id', model.getrep);
app.get('/profilclient/:_id', model.getproclient);
app.get('/descriptionAd/:_id', model.getdescAd);
 app.put('/updDescription/:_id', model.updDescription);
 app.get('/couverture/:image', model.couverture);
 app.delete('/delete/:_id', model.delete);
 app.delete('/deleteGestion/:_id', model.deletegestion);
 app.put('/couveApdate/:_id', model.updcouverture);
 
 app.put('/gestionApdate/:_id', model.updategestion);
 
 app.put('/profUpdate/:_id', model.updateProfil);
// app.get('/profil/:id', model.edit);
//publish


    const pers = require('../Controllers/controller.article');
    
    app.post('/profil', pers.create);
    app.get('/profil', pers.findAll);
    app.get('/profil/:profilId', pers.findOne);
    
    //app.get('/user/:photo_profil', pers.lireImage);
    // app.put('/profil/:id', pers.editlist);
    // app.get('/profil/:id', pers.edit);
    //
module.exports = app; 
