'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const userStore = require('../models/user-store');


const profil = {
    
  index(request, response) {
   const loggedInUser = accounts.getCurrentUser(request); 
    const userId = request.params.id;
    if(loggedInUser){ 
      
      const viewData = {
        title: 'Profil',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        userpic: loggedInUser.userpic,
        id: loggedInUser.id,
        firstname:loggedInUser.firstName,
        lastname:loggedInUser.lastName,
    };
    response.render('profil', viewData);
    } else response.redirect('/');
   
  },

  updateProfil(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const id = loggedInUser.id;
    const updatedProfil = {
      userpic:request.files.userpic,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
    };
    userStore.editProfil(id, updatedProfil);
    response.redirect('/profil');
    
    
  },
    
   deleteProfil(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const userId = loggedInUser.id;
    logger.debug(`Deleting user ${userId}`);
    userStore.removeProfil(userId);
    response.redirect('/');
  },

};



module.exports = profil;