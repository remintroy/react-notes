import { NewRequest } from "../../types.dynamic";
import NoteRepository from "../repository/noteRepository";

interface UserControllerOptions {
    noteRepository: NoteRepository
}

export default class UserController {
    private noteRepository: NoteRepository;

    constructor(options: UserControllerOptions) {
        this.noteRepository = options.noteRepository;
    }

    addNote = (req: NewRequest) => {
        
    }
}