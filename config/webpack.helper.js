const path = require('path');

function dir(){
  return path.resolve(__dirname, '..');
}

module.exports = {
  root : dir()
}