export default abstract class NoteRepository{
    abstract add(noteData: Note): Promise<Note | null>;
    abstract get(uid: string): Promise<Note | null>;
    abstract edit(uid: string, data: Note): Promise<Note | null>;
    abstract delete(uid: string): Promise<Note | null>;
}