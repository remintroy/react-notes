import { Box, Flex, Text, Textarea } from "@mantine/core";
import Editor from "../Editor";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { updateNote, updateNoteBody, updateNoteTitle } from "../../lib/redux/slices/noteSlice";
import { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { useGetNoteQuery, useUpdateNoteMutation } from "../../lib/api/noteApi";

export default function NoteView({ noteid }: { noteid: string }) {
    const notes = useAppSelector(state => state.note.data);
    const note = notes?.[noteid];
    const { data } = useGetNoteQuery({ noteid }, { skip: !(!note?.noteid) })
    const dispatch = useAppDispatch();
    const setTitle = (title: string) => { if (title) dispatch(updateNoteTitle({ noteid: noteid, title })); }
    const setBody = (body: string) => { if (body) dispatch(updateNoteBody({ noteid: noteid, body })); }
    const [updateBlogApi] = useUpdateNoteMutation();
    const [saving, setSaving] = useState(false)

    const [titleValue, setTitleValue] = useDebouncedState(note?.title, 500)
    const [bodyValue, setBodyValue] = useDebouncedState(note?.body, 500)

    useEffect(() => {
        // update title here
        if (titleValue || bodyValue) (async () => {
            setSaving(true)
            try {
                if (titleValue) await updateBlogApi({ note: { noteid, title: titleValue } });
                if (bodyValue) await updateBlogApi({ note: { noteid, body: bodyValue } });
            } catch (error) {
                console.log(error)
            } finally {
                setSaving(false)
            }
        })()

    }, [titleValue, bodyValue])

    useEffect(() => {
        if (data) dispatch(updateNote(data))
    }, [data])


    useEffect(() => {
        if (note?.title) setTitleValue(note?.title)
        if (note?.body) setBodyValue(note?.body)
    }, [note])

    return <Box>
        {
            note && <>
                <Textarea
                    placeholder="Note the point"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    value={note?.title}
                    autosize
                    pb={10}
                    sx={{ textarea: { margin: 0, padding: 0, fontSize: "2rem", fontWeight: "bold", border: "none", backgroundColor: "transparent" } }}
                ></Textarea>

                <Text fz={"sm"} color="dimmed">
                    <Flex justify={"space-between"}>
                        <span>Today 8:50PM</span>
                        <span>{saving ? "Saving" : "Saved"}</span>
                    </Flex>
                </Text>

                <Box pt={15}>
                    <Editor content={note?.body} setContent={setBody} />
                </Box></>
        }

    </Box>
}