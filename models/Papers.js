var mongoose = require('mongoose');

var PapersSchema = new mongoose.Schema({
  title: { type: String },
  authors: [{ type: String }],
  journal: { type: String },
  doi: { type: String },
  published: { type: Date },
  tags: [{ type: String }],
  abstract: { type: String }
});

module.exports = mongoose.model('Papers', PapersSchema);