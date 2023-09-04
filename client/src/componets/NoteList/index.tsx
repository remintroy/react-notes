import { Card, Flex, Text } from "@mantine/core"

function NodeItem() {
    return <>
        <Card withBorder p={20} >
            <Text fz={"lg"} my={2} component="h1">Sample title</Text>
            <Text fz={"sm"} color="dimmed">
                <Flex justify={"space-between"}>
                    <span>Today 8:50PM</span>
                    <span>Saved</span>
                </Flex>
            </Text>
        </Card>
    </>
}

export default function NoteList() {
    return <Flex direction={"column"} gap={10}>
        <NodeItem />
        <NodeItem />
        <NodeItem />

    </Flex>
}