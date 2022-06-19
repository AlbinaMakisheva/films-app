'use strict';

// import all required modules
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const filmlistStore = require('../models/filmlist-store.js');
const uuid = require('uuid');




// create dashboard object
const dashboard = {
  
index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    
    
    const viewData = {
      title: 'Filmlist Dashboard',
      filmlists: filmlistStore.getUserFilmlists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      userpic: loggedInUser.userpic,
    };
    logger.info('about to render' + viewData);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  deleteFilmlist(request, response) {
    const filmlistId = request.params.id;
    logger.debug(`Deleting Filmlist ${filmlistId}`);
    filmlistStore.removeFilmlist(filmlistId);
    response.redirect('/dashboard');
  },
    addFilmlist(request, response) {
    const date=new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newFilmList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
       picture: request.files.picture,
      date:date,
      films: [],
    };
      logger.debug('Creating a new Filmlist' + newFilmList);
    filmlistStore.addFilmlist(newFilmList, function(){
      response.redirect('/dashboard');
    });
    
  },
};

// export the dashboard module
module.exports = dashboard;