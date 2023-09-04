import { Container, Grid, Text } from "@mantine/core"
import NoteView from "./componets/NoteView"

function App() {

  return (
    <>
      <div className="header">
        <Text fw={"bold"}>Note the point</Text>
      </div>
      <Container p={30}>

        <Grid p={30}>
          <Grid.Col span={6}>
            <NoteView noteid="noteid" />
          </Grid.Col>
          <Grid.Col span={6}>
            <NoteView noteid="noteid" />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

export default App
