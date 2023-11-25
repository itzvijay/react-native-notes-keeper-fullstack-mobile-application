import express from "express"
import { searchUserNotes, createNote, deleteNoteByNoteId, getNotesByUserId } from "../controllers/Note.js";

const router = express.Router();
router.post("/create",createNote);
router.get("/get/:userId",getNotesByUserId);
router.delete("/:noteId",deleteNoteByNoteId);
router.get("/search",searchUserNotes);
export default router;