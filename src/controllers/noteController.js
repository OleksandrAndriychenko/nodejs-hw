import { note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const notes = await note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await note.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    next(createHttpError(404, "Student not found"));
    return;
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await note.findOneAndUpdate(
    { _id: noteId },
    req.body,
    { new: true },
  );

  if (!note) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json(note);
};
