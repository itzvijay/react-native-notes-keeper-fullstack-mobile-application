import Notes from "../models/notes.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    console.log(title, content, userId);
    const newNote = new Notes({ title, content, userId });
    await newNote.save();
    res.status(200).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNotesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Notes.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteNoteByNoteId = async (req, res) => {
  try {
    const { noteId } = req.params;
    console.log({ message: "noteId " + noteId });
    const deleteNote = await Notes.findByIdAndDelete(noteId);
    if (!deleteNote) {
      res.status(400).json("note not Found");
    }
    res.status(200).json({ message: "note deleted successfully", deleteNote });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const searchUserNotes = async (req, res) => {
  try {
    const { userId, searchInput } = req.query;
    console.log(userId,searchInput)
    const notes = await Notes.find({ userId });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found for the given userId" });
    }

    const filteredNotesFromUserId = notes.filter(note => {
      return note.title.toLowerCase().trim().includes(searchInput.toLowerCase().trim());
    });

    if (filteredNotesFromUserId.length === 0) {
      return res.status(404).json({ message: "No notes found for the given search input" });
    }

    res.status(200).json({filteredNotes : filteredNotesFromUserId});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

