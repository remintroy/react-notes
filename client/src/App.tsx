import { Box, Button, Container, Flex, Input, Modal, Paper, Text } from "@mantine/core"
import NoteView from "./componets/NoteView"
import NoteList from "./componets/NoteList"
import { IconPlus, IconSearch, IconArrowLeft } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";
import { closeEditor } from "./lib/redux/slices/editorSlice";

function App() {
  const editor = useAppSelector(state => state.editor.editor);
  const dispatch = useAppDispatch();
  const closeEditorModal = () => dispatch(closeEditor())

  return (
    <>
      <Container p={30} >
        <Paper>
          <Text fz={"md"} fw={'bold'}>
            <Flex align={"center"} justify={"space-between"}>
              <span>Note It {"(beta)"}</span>
              <Flex align={"center"} gap={10}>
                <Button leftIcon={< IconPlus size="1rem" />}>New note</Button>
                <Button variant="default">Login</Button>
              </Flex>
            </Flex>
          </Text>
        </Paper>

        <Box mt={10} />
        <Input py={20} placeholder="Type to search" rightSection={<IconSearch />} size="lg" />
        <NoteList />

        <Modal opened={editor.open} onClose={closeEditorModal} withCloseButton={false} centered fullScreen
          transitionProps={{ transition: 'fade', duration: 200 }}>
          <Container>
            <Flex py={30} align={'center'} justify={"start"} gap={10}>
              <Button variant="" px={0} mx={0} leftIcon={<IconArrowLeft />} onClick={closeEditorModal}>
                Back to home
              </Button>
            </Flex>
            <NoteView noteid="noteid" />
          </Container>
        </Modal>
      </Container>
    </>
  )
}

export default App
