import { Flex, Text } from "@mantine/core";
import { useNavigate, useParams } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'
import NoteView from "../../componets/NoteView";

export default function EditNotePage() {
    const navigate = useNavigate();
    const noteid = useParams()?.id;

    return <>
        <Flex  pb={30} align={'center'} justify={"start"} gap={10}>
            <Flex px={0} mx={0} align="center" gap={10} onClick={() => navigate('/')} sx={{ cursor: "pointer" }}>
                <IconArrowLeft size={"30px"} />  <Text p={0} m={0} ></Text>
            </Flex>
        </Flex>
        <NoteView noteid={noteid as string} />
    </>
}