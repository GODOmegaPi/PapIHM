const Note = require('../models/noteModel');

const { handleError, ErrorHandler } = require('../helpers/error');
const getNote = (req, res) => {
  Note.find(req.query).skip(req.offset).limit(req.limit)
    .sort(req.sort_by_direction + req.sort_by_field)
    .populate(req.populate)
    .exec((findErr, notes) => {
      if (findErr) throw new ErrorHandler(400, findErr.message);
      return res.json({ data: notes, error: false });
    });
};

const getById = (req, res) => {
  Note.findById(req.params.id, (findErr, note) => {
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);
    return res.json({ data: note, error: false });
  });
};


const createNote = (req, res) => {
  req.body.imagePath = req.file.filename;
  req.body.owner = req.requester;
  const newNote = new Note(req.body);
  newNote.save((err) => {
    if (err) return handleError(new ErrorHandler(400, err), res);
    return res.json({ data: newNote, error: false, message: 'Successfully saved' });
  });
};


const deleteNote = (req, res) => {
  Note.findById(req.params.id, ((findErr, note) => {
    if (!note) return handleError(new ErrorHandler(404, 'Note not found'), res);
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);

    if (note.owner.toString() !== req.requester) return handleError(new ErrorHandler(403, 'You are not authorized to access this resource'), res);
    note.remove((removeErr, removedDevlog) => {
      if (removeErr) return handleError(new ErrorHandler(400, removeErr.message), res);
      return res.json({ data: removedDevlog, error: false, message: 'Successfully deleted' });
    });
  }));
};

const searchNote = (req, res) => {
  Note.find({ $text: { $search: req.body.data } }).skip(req.offset).limit(req.limit)
    .sort(req.sort_by_direction + req.sort_by_field)
    .populate(req.populate)
    .exec((findErr, notes) => {
      if (findErr) throw new ErrorHandler(400, findErr.message);
      return res.json({ data: notes, error: false });
    });
};

module.exports = {
  createNote,
  getNote,
  getById,
  deleteNote,
  updateNote,
  searchNote,
};
