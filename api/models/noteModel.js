const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const fs = require('fs-extra');


const { ErrorHandler } = require('../helpers/error');

mongoose.plugin(slug);

const { Schema } = mongoose;
const { ObjectId } = Schema;
const noteSchema = new Schema({
  title: {
    type: String,
    text: true,
  },
  content: {
    type: String,
    required: 'You should provide a content for your note',
  },
  level: {
    type: Number,
    default: 1,
  },
  alwaysVisible: {
    type: Boolean,
    default: false,
  },
  reminderPattern: {
    type: String,
    required: 'You should provide a description for your note',
  },
});

noteSchema.statics.findById = function (id, cb) {
  let noteId;
  try {
    noteId = mongoose.Types.ObjectId(id);
  } catch (e) {
    throw new ErrorHandler(404, 'Note not found');
  }
  return this.model('Note').findOne({ _id: noteId }, cb);
};
module.exports = mongoose.model('Note', noteSchema);
