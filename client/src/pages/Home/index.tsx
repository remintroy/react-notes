import { Box, Button, Flex, Input, Paper, Text } from "@mantine/core";
import { IconPlus, IconSearch } from '@tabler/icons-react'
import NoteList from "../../componets/NoteList";
import { addNote } from "../../lib/redux/slices/noteSlice";
import { useCreateNoteMutation } from "../../lib/api/noteApi";
import { useAppDispatch } from "../../lib/redux/hooks";
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const [createNoteApi] = useCreateNoteMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleCreateNote = async () => {
        try {
            const { data }: any = await createNoteApi("");
            if (data) {
                dispatch(addNote({ noteid: data?.noteid }));
                navigate(`/edit/${data?.noteid}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <Box>
        <Paper>
            <Flex align={"center"} justify={"space-between"}>
                <Text fz={"lg"} fw={'bold'}>   Note It {"(beta)"} </Text>
                <Flex align={"center"} gap={10}>
                    <Button leftIcon={< IconPlus size="1rem" />} onClick={handleCreateNote}>New note</Button>
                    <Button variant="default">Login</Button>
                </Flex>
            </Flex>
        </Paper>

        <Box mt={10} />
        <Input py={20} placeholder="Type to search" rightSection={<IconSearch />} size="lg" />
        <NoteList />
    </Box>
}