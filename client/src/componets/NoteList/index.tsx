import { Flex, Grid, Paper, Text } from "@mantine/core"
import { useAppSelector } from "../../lib/redux/hooks"
import { Note } from "../../lib/redux/slices/noteSlice";

function NoteItem({ note }: { note: Note }) {
    return <Paper withBorder p={20} >
        <Text fz={"lg"} my={2} component="h1">{note.title}</Text>
        <Text fz={"sm"} color="dimmed" >
            <Flex justify={"space-between"} >
                <span>{note.createdAt} . {note.category.map((e, i) => <Text key={i} component="span" transform="capitalize" >{e} </Text>)}</span>
                <span>Saved</span>
            </Flex>
        </Text>
    </Paper>
}

export default function NoteList() {
    const notes = useAppSelector(state => state.note.data);

    return <Flex direction={"column"} gap={10}>
        <Grid>
            {notes.map(note => <Grid.Col span={6} key={note.noteid}><NoteItem note={note} /></Grid.Col>)}
        </Grid>
        {notes.map(note => <NoteItem key={note.noteid} note={note} />)}
    </Flex>
}