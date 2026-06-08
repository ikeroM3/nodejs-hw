import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/noteController.js';
import { celebrate } from 'celebrate';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js'; // ← один імпорт, правильний регістр

const router = Router();

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote); // ← була відсутня валідація
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote); // ← була відсутня валідація
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote); // ← неправильний синтаксис

export default router;
