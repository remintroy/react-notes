export default abstract class NoteRepository {
    abstract add(noteData: Note): Promise<Note | null>;
    abstract get(noteid: string): Promise<Note | null>;
    abstract getAll(): Promise<Note[]>
    abstract edit(noteid: string, data: Note): Promise<Note | null>;
    abstract delete(noteid: string): Promise<Note | null>;
}