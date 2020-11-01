var mongoose = require('mongoose');

var PapersSchema = new mongoose.Schema({
  title: {type: String},
  authors: {type: String},
  journal: {type: String},
  topic: {type: String},
  doi: {type: String},
  added: {type: Date}
});

module.exports = mongoose.model('Papers', PapersSchema);