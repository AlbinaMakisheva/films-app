'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');



const blacklistStore = {

  store: new JsonStore('./models/blacklist.json', { blacklists: [] }),
  collection: 'blacklists',

  getAllblackFilms() {
    return this.store.findAll(this.collection);
  },

  getblackFilm(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserblackFilms(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },


  addblackFilm(blacklist,response) {
     this.store.add(this.collection, blacklist);
  },

  removeblackFilm(id) {
    const blacklist = this.getblackFilm(id);
    this.store.remove(this.collection, blacklist);
  },
  

};

module.exports = blacklistStore;
