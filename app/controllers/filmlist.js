'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const filmlistStore = require('../models/filmlist-store');
const uuid = require('uuid');


  

   
const filmlist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    const filmlistId = request.params.id;
    logger.debug('Filmlist id = ' + filmlistId);
    if(loggedInUser){ 
   
      const viewData = {
      title: 'Filmlist',
      filmlist: filmlistStore.getFilmlist(filmlistId),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        userpic: loggedInUser.userpic,
        
    };
    response.render('filmlist', viewData);
    } else response.redirect('/');
   
  },
   deleteFilm(request, response) {
    const filmlistId = request.params.id;
    const filmId = request.params.filmid;
    logger.debug(`Deleting Film ${filmId} from Filmlist ${filmlistId}`);
    filmlistStore.removeFilm(filmlistId, filmId);
    response.redirect('/filmlist/' + filmlistId);
  },
   addFilm(request, response) {
    const filmlistId = request.params.id;
    const filmlist = filmlistStore.getFilmlist(filmlistId);
     const filmsInPl=0;
    const newFilm = {
      id: uuid(),
      title: request.body.title,
      genre: request.body.genre,
      duration: request.body.duration,
    };
    
    filmlistStore.addFilm(filmlistId, newFilm);
    response.redirect('/filmlist/' + filmlistId);
  },
  updateFilm(request, response) {
    const filmlistId = request.params.id;
    const filmId = request.params.filmid;
    logger.debug("updating film " + filmId);
    const updatedFilm = {
      title: request.body.title,
      genre: request.body.genre,
      duration: request.body.duration
    };
    filmlistStore.editFilm(filmlistId, filmId, updatedFilm);
    response.redirect('/filmlist/' + filmlistId);
  }

};



module.exports = filmlist;