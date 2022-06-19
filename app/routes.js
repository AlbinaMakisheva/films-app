'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const accounts = require ('./controllers/accounts.js');
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const filmlist = require('./controllers/filmlist.js');
const blacklist=require('./controllers/blacklist.js');
const profil=require('./controllers/profil.js');

// connect routes to controllers
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/filmlist/:id', filmlist.index);
router.get('/filmlist/:id/deleteFilm/:filmid', filmlist.deleteFilm);
router.get('/dashboard/deletefilmlist/:id', dashboard.deleteFilmlist);
router.get('/about/deletecomment/:id', about.deleteComment);
router.get('/profil', profil.index);

router.post('/profil/updateprofil', profil.updateProfil);
router.post('/filmlist/:id/addfilm', filmlist.addFilm);
router.post('/dashboard/addfilmlist', dashboard.addFilmlist);
router.post('/filmlist/:id/updatefilm/:filmid', filmlist.updateFilm);
router.get('/profil/deleteprofil/:id', profil.deleteProfil);

router.get('/blacklist',blacklist.index);
router.post('/blacklist/addblackfilm', blacklist.addblackFilm);
router.get('/blacklist/deleteblackfilm/:id', blacklist.deleteblackFilm);


router.post('/about/addComment',about.addComment);

// export router module
module.exports = router;