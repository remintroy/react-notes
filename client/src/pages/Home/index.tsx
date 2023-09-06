import { Box, Button, Flex, Input, Paper, Text } from "@mantine/core";
import { IconPlus, IconSearch } from '@tabler/icons-react'
import NoteList from "../../componets/NoteList";
import { addNote, updatePage } from "../../lib/redux/slices/noteSlice";
import { useCreateNoteMutation, useSearchNoteQuery } from "../../lib/api/noteApi";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

export default function HomePage() {
    const [createNoteApi] = useCreateNoteMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const { data } = useSearchNoteQuery({ searchQuery: searchValue })

    const meta: any = useAppSelector(state => state.note.meta);
    const page = useAppSelector(state => state.note.page);

    const handleCreateNote = async () => {
        try {
            const { data }: any = await createNoteApi("");
            if (data) {
                dispatch(addNote({ noteid: data?.noteid }));
                navigate(`/edit/${data?.noteid}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadmore = () => {
        if (meta?.page == page) dispatch(updatePage((meta?.page || page) + 1));
    }

    return <Box>
        <Paper>
            <Flex align={"center"} justify={"space-between"}>
                <Text fz={"lg"} fw={'bold'}>   N4-Note {"(beta)"} </Text>
                <Flex align={"center"} gap={10}>
                    <Button leftIcon={< IconPlus size="1rem" />} onClick={handleCreateNote}>New note</Button>
                    {/* <Button variant="default">Login</Button> */}
                </Flex>
            </Flex>
        </Paper>
        <Box mt={10} />
        <Input py={10} placeholder="Type to search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} rightSection={<IconSearch />} size="lg" />
        {searchValue && <NoteList data={data} />}
        {!searchValue && <NoteList />}
        {!searchValue && meta && meta?.hasNextPage && <Flex justify={"center"} py={50}>
            <Button onClick={() => handleLoadmore()}>Show more</Button>
        </Flex>}
    </Box>
}