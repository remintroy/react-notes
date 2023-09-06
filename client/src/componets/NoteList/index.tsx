import { ActionIcon, Flex, Grid, Paper, Skeleton, Text } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks"
import { Note, deleteNote } from "../../lib/redux/slices/noteSlice";
import { useNavigate } from 'react-router-dom'
import { IconTrash } from '@tabler/icons-react'
import { useDeleteNoteMutation } from "../../lib/api/noteApi";

function NoteItem({ note }: { note: Note }) {
    const navigate = useNavigate();
    const [deleteNoteApi] = useDeleteNoteMutation();
    const dispatch = useAppDispatch();

    const deleteNoteHandler = async () => {
        try {
            await deleteNoteApi({ noteid: note.noteid });
            dispatch(deleteNote({ noteid: note.noteid }))
        } catch (error) {
            console.log(error)
        }
    }

    return <Paper withBorder p={20} onClick={() => navigate(`/edit/${note?.noteid}`)}>
        <Flex justify={"space-between"}>
            <Text fz={"lg"} my={2} component="h1">{note.title || "-"}</Text>
            <ActionIcon variant="" onClick={(e) => { e.stopPropagation(); deleteNoteHandler() }}><IconTrash size="1.5em" /></ActionIcon>
        </Flex>
        <Text fz={"sm"} color="dimmed" >
            <Flex justify={"space-between"} >
                <span>{new Date(note.createdAt || Date.now()).toDateString()} . {note?.category?.map((e, i) => <Text key={note?.category?.[i] || i} component="span" transform="capitalize" >{e} </Text>)}</span>
                <span>Saved</span>
            </Flex>
        </Text>
    </Paper>
}

export default function NoteList({ data }: { data?: any }) {
    const notes = data || useAppSelector(state => state.note.data);
    const loading = useAppSelector(state => state.note.loading)

    return <Flex direction={"column"} gap={10}>
        {Object.keys(notes).length == 0 && <>
            <Skeleton visible={loading} w={"100%"} h={100}></Skeleton>
            <Skeleton visible={loading} w={"100%"} h={100}></Skeleton>
            <Skeleton visible={loading} w={"100%"} h={50}></Skeleton>
        </>}
        <Grid>
            {Object.keys(notes)?.map(key => {
                const note = notes[key];
                return <Grid.Col key={note.noteid}><NoteItem note={note} /></Grid.Col>
            })}
        </Grid>
    </Flex>
}