import GetUtils from "../../lib/utils";
import { NewRequest } from "../../types.dynamic";
import createNote from "../../use-cases/create-note";
import deleteNote from "../../use-cases/delete-note";
import getNote from "../../use-cases/get-note";
import getNotes from "../../use-cases/get-notes";
import searchNote from "../../use-cases/search-notes";
import updateNote from "../../use-cases/update-note";
import NoteRepository from "../repository/noteRepository";

interface NoteControllerOptions {
    noteRepository: NoteRepository
    utils: GetUtils;
}

export default class NoteController {
    private noteRepository: NoteRepository;
    private utils: GetUtils;

    constructor(options: NoteControllerOptions) {
        this.noteRepository = options.noteRepository;
        this.utils = options.utils;
    }

    getNotes = async (req: NewRequest) => {
        const page = Number(req.query.page) || 1;
        return await getNotes(this.noteRepository, this.utils, { page })
    }

    getNote = async (req: NewRequest) => {
        const noteid = req.params?.id as string;
        return await getNote(this.noteRepository, this.utils, { noteid })
    }

    createNote = async () => {
        return await createNote(this.noteRepository, this.utils)
    }

    updateNote = async (req: NewRequest) => {
        const { title, body, category, noteid, }: Note = req.body;
        return await updateNote(this.noteRepository, this.utils, { title, body, category, noteid })
    }

    deleteNote = async (req: NewRequest) => {
        const { noteid } = req.body;
        return await deleteNote(this.noteRepository, this.utils, { noteid })
    }

    searchNote = async (req: NewRequest) => {
        const searchQuery = req.query.query as string;
        return await searchNote(this.noteRepository, this.utils, searchQuery)
    }
}