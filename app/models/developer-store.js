'use strict';


const developerStore = {

   // import the filmlist collection object
  developers: require('./developer-store.json').developers,
  // function to get all of the filmlists
  getAllDevelopers() {
    return this.developers;
  },

};

// export the filmlistStore object so it can be used elsewhere
module.exports = developerStore;