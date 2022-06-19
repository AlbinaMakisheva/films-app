'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');
try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const filmlistStore = {

  store: new JsonStore('./models/filmlist-store.json', { filmlistCollection: [] }),
  collection: 'filmlistCollection',

  getAllFilmlists() {
    return this.store.findAll(this.collection);
  },

  getFilmlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addFilmlist(filmlist, response) {
      filmlist.picture.mv('tempimage', err => {
       if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            filmlist.picture = result.url;
            response();
          });
       }
   });
    this.store.add(this.collection, filmlist);
  },

  removeFilmlist(id) {
    const filmlist = this.getFilmlist(id);
    this.store.remove(this.collection, filmlist);
  },

  removeAllFilmlists() {
    this.store.removeAll(this.collection);
  },

  addFilm(id, film,updatedFilmlist) {
    const filmlist = this.getFilmlist(id);
    filmlist.films.push(film);
    
  },

  removeFilm(id, filmId) {
    const filmlist = this.getFilmlist(id);
    const films = filmlist.films;
    _.remove(films, { id: filmId});
  },
   editFilm(id, filmId, updatedFilm) {
    const filmlist = this.getFilmlist(id);
    const films = filmlist.films;
    const index = films.findIndex(film => film.id === filmId);
    films[index].title = updatedFilm.title;
    films[index].genre = updatedFilm.genre;
    films[index].duration = updatedFilm.duration;
  },
   getUserFilmlists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
 
};

module.exports = filmlistStore;
