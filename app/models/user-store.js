'use strict';

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');
const _ = require('lodash');
const JsonStore = require('./json-store');


try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}
const userStore = {

  store: new JsonStore('./models/user-store.json', {users: []}),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user, response) {
    user.userpic.mv('tempimage', err=>{
      if(!err){
        cloudinary.uploader.upload('tempimage', result=>{
          console.log(result);
          user.userpic=result.url;
          response();
        });
      }
    })
    this.store.add(this.collection, user);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
   removeProfil(id) {
    const user = this.getUserById(id);
    this.store.remove(this.collection,user)
  },
  
  editProfil(id, updatedProfil) {
    const user = this.getAllUsers();
     const index = user.findIndex(user=>user.id===id);
    user[index].firstName = updatedProfil.firstname;
    user[index].lastName = updatedProfil.lastname;
     updatedProfil.userpic.mv('tempimage', err => {
       if (!err) {
         cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            user[index].userpic = result.url;
          });
       }
   }
)
  },
 

 
}

module.exports = userStore;


  