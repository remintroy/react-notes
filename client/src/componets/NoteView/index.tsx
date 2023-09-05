import { Autocomplete, Badge, Box, Flex, Text, Textarea } from "@mantine/core";
import Editor from "../Editor";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { updateNote, updateNoteBody, updateNoteCategory, updateNoteTitle } from "../../lib/redux/slices/noteSlice";
import { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { useGetNoteQuery, useUpdateNoteMutation } from "../../lib/api/noteApi";
import { IconX } from '@tabler/icons-react'

export default function NoteView({ noteid }: { noteid: string }) {
    const notes = useAppSelector(state => state.note.data);
    const note = notes?.[noteid];
    const { data } = useGetNoteQuery({ noteid }, { skip: !(!note?.noteid) })
    const [tags, setTags] = useState<string[]>(note?.category || []);
    const dispatch = useAppDispatch();

    const setTitle = (title: string) => { if (title) dispatch(updateNoteTitle({ noteid: noteid, title })); }
    const setBody = (body: string) => { if (body) dispatch(updateNoteBody({ noteid: noteid, body })); }
    const setCategory = (categorys: string[]) => { if (categorys) dispatch(updateNoteCategory({ noteid, category: tags })) }
    const [updateNoteApi] = useUpdateNoteMutation();
    const [saving, setSaving] = useState(false)

    const [titleValue, setTitleValue] = useDebouncedState(note?.title, 500)
    const [bodyValue, setBodyValue] = useDebouncedState(note?.body, 500)

    const [searchData, _] = useState([]);
    const [tagsInput, setTagsInput] = useState("");

    useEffect(() => {
        // update title here
        if (titleValue || bodyValue || tags) (async () => {
            setSaving(true)
            try {
                if (titleValue) await updateNoteApi({ note: { noteid, title: titleValue } });
                if (bodyValue) await updateNoteApi({ note: { noteid, body: bodyValue } });
                if (tags) await updateNoteApi({ note: { noteid, category: tags } })
            } catch (error) {
                console.log(error)
            } finally {
                setSaving(false)
            }
        })()

    }, [titleValue, bodyValue, tags])

    useEffect(() => {
        if (data) dispatch(updateNote(data))
    }, [data])


    useEffect(() => {
        if (note?.title) setTitleValue(note?.title)
        if (note?.body) setBodyValue(note?.body);
        if (note?.category) setTags(note?.category)
    }, [note]);


    useEffect(() => {
        setCategory(tags)
    }, [tags])

    // const searchCategory = async (searchQuery: string) => {
    //     console.log(searchQuery)
    // }

    const handleDeleteCategory = (tag: string) => {
        setTags((pre: any) => {
            return pre.filter((tag_pre: any) => tag_pre !== tag);
        });
    };


    const handleSetData = (e: any) => {
        let value = e.target.value?.trim();
        if (e.keyCode === 13 && value && !tags?.includes(value)) {
            setTags((pre) => [...pre, tagsInput]);
            e.target.value = "";
            setTagsInput("")
        }
    };

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
                        <span>Today 8:50PM . {tags?.join(" ")}</span>
                        <span>{saving ? "Saving" : "Saved"}</span>
                    </Flex>
                </Text>

                <Box py={15}>
                    {tags?.map((tag) => {
                        return (
                            <Badge key={tag} rightSection={<IconX onClick={() => handleDeleteCategory(tag)} size={"15px"} />}>
                                {tag}
                            </Badge>
                        );
                    })}
                </Box>

                <Autocomplete value={tagsInput} onChange={(e) => setTagsInput(e)} onKeyUp={handleSetData} placeholder="Pick Tags where your blog belongs to" data={searchData} />

                <Box pt={15}>
                    <Editor content={note?.body} setContent={setBody} />
                </Box></>
        }

    </Box>
}