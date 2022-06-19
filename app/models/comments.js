'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const commentsStore={
   store: new JsonStore('./models/comments-store.json', { comments: [] }),
  collection: 'comments',

 getAllComments() {
    return this.store.findAll(this.collection);
  },
  
  getComment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  addComment(usercomment) {
   this.store.add(this.collection, usercomment);
  },
   removeComment(id) {
    const usercomment = this.getComment(id);
    this.store.remove(this.collection, usercomment);
  },
};

module.exports = commentsStore;
