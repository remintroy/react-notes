import { Box, Flex, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import Editor from "../Editor";


export default function NoteView({ noteid }: { noteid: string }) {

    console.log(noteid)

    const [content, setContent] = useState("");
    const [edit, setEdit] = useState(true);
    const [title, setTitle] = useState("")

    return <Box sx={{ paddingTop: "25px" }}>
        <Textarea
            placeholder="Note the point"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autosize
            py={10}
            sx={{ textarea: { margin: 0, padding: 0, fontSize: "2rem", fontWeight: "bold", border: "none", backgroundColor: "transparent" } }}
        ></Textarea>

        <Text fz={"sm"} color="dimmed">
            <Flex justify={"space-between"}>
                <span>Today 8:50PM</span>
                <span>Saved</span>
            </Flex>
        </Text>

        <Box pt={15}>
            {edit ? <Editor content={content} setContent={setContent} />
                :
                <Box>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </Box>}
        </Box>

    </Box>
}