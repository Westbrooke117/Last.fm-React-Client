import {Progress, Stat, StatArrow, StatHelpText, Td, Tr, Text, Box, Tooltip, Avatar, Stack} from "@chakra-ui/react";

const BarChartElement = (props) => {
    return (
        <Tr>
            <Td w={'10px'} textAlign={'center'}>
                {props.number}
            </Td>
            <Td>
                <Stack direction={'row'}>
                    <Avatar borderRadius={5} size={'sm'} name={props.name}/>
                    <Box w={'100%'}>
                        <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
                            <Text><b>{props.name}</b> · {props.playcount} plays</Text>
                        </Box>
                        <Progress borderRadius={3} mt={1} h={3} value={props.value} colorScheme={'red'}/>
                    </Box>
                </Stack>
            </Td>
        </Tr>
    )
}

export default BarChartElement