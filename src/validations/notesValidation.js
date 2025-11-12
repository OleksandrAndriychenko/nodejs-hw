import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().optional().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "title must be a string",
      "string.min": "title should have at least {#limit} characters",
      "any.required": "title is required",
    }),
    content: Joi.string().allow('').messages({
      "string.base": "content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "any.only": `tag must be one of: ${TAGS}`,
    }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      "string.base": "title must be a string",
      "string.min": "title should have at least {#limit} characters",
    }),
    content: Joi.string().allow('').messages({
      "string.base": "content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).messages({
      "any.only": `tag must be one of: ${TAGS}`,
    }),
  }).min(1),
};
