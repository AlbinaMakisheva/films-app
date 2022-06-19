'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const blacklistStore = require('../models/blacklist.js');
const uuid = require('uuid');


   

const blacklist = {
  
index(request, response) {
    logger.info('blacklist rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      
    
    const viewData = {
      title: 'Filmlist Dashboard',
      blacklists: blacklistStore.getUserblackFilms(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      userpic: loggedInUser.userpic,
    };
    logger.info('about to render' + viewData);
    response.render('blacklist', viewData);
    }
    else response.redirect('/');
  },
  deleteblackFilm(request, response) {
    const id = request.params.id;
    logger.debug(`Deleting Film ${id}`);
    blacklistStore.removeblackFilm(id);
    response.redirect('/blacklist');
  },
    addblackFilm(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newblackFilm = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      genre: request.body.genre,
    };
      logger.debug('Creating a new Film' + newblackFilm);
    blacklistStore.addblackFilm(newblackFilm);
      response.redirect('/blacklist');
    }
    
  };



module.exports = blacklist;