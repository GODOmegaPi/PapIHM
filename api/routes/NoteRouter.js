const router = require('express').Router();


const noteController = require('../controllers/noteController.js');
const { checkToken } = require('../middleware/auth-token');
const { parsePagination, parseFilter, parsePopulate } = require('../middleware/pagination');


// All notes
router.get('/', parsePagination, parseFilter, parsePopulate, noteController.getNote);
router.post('/search', parsePagination, parseFilter, parsePopulate, noteController.searchNote);

router.post('/', checkToken, upload.single('file'), noteController.createNote);

router.get('/:id', noteController.getById);
router.delete('/:id', checkToken, noteController.deleteNote);
router.put('/:id', checkToken, upload.single('file'), noteController.updateNote);
router.get('/:id/devlogs', devlogController.getNoteDevlog);

module.exports = router;
