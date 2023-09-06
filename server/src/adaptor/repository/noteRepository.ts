import { PaginateModel } from "mongoose";

export default abstract class NoteRepository {
    abstract add(noteData: Note): Promise<Note | null>;
    abstract get(noteid: string): Promise<Note | null>;
    abstract getAll(page?: number): Promise<PaginateModel<Note[]>>
    abstract edit(noteid: string, data: Note): Promise<Note | null>;
    abstract delete(noteid: string): Promise<Note | null>;
    abstract search(searchQuery: string): Promise<Note[]>
}