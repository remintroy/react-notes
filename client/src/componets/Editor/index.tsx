import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor, BubbleMenu } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder'
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function Editor({ content, setContent }: { content: string | undefined, setContent: Dispatch<SetStateAction<string>> }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Start typing your note content' })
        ],
        content,
    });

    useEffect(() => {
        setContent(editor?.getHTML() || "");
    }, [editor?.getHTML()])


    return <RichTextEditor editor={editor}>
        {editor && <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Link />
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>
        </BubbleMenu>}
        <RichTextEditor.Content />
    </RichTextEditor>
}