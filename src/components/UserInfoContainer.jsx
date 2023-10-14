import {
    Avatar,
    Badge,
    Box,
    Button, Fade, IconButton, Input,
    Stack,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    useColorMode
} from "@chakra-ui/react";
import {MoonIcon, SearchIcon, SunIcon} from "@chakra-ui/icons";
const UserInfoContainer = (props) => {
    return (
        <>
            <Box mt={3} mb={3}>
                <Stack direction={'row'} display={'flex'} alignContent={'baseline'} alignItems={'center'}>
                    <Avatar size={'sm'} name={props.name} src={props.image} />
                    <Text>{props.name}</Text>
                    { props.subscriber === 1 && <Badge>Pro</Badge>}
                    <Input size={'sm'} ml={250} borderRadius={5} w={250} variant='filled' placeholder='Search for user...' />
                </Stack>
            </Box>
            <hr/>
            <StatGroup mt={5} mb={5}>
                <Stat>
                    <StatLabel>Scrobbles</StatLabel>
                    <StatNumber>{props.scrobbles.toLocaleString()}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Artists</StatLabel>
                    <StatNumber>{props.artists.toLocaleString()}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Albums</StatLabel>
                    <StatNumber>{props.albums.toLocaleString()}</StatNumber>
                </Stat>
            </StatGroup>
        </>
    )
}

export default UserInfoContainer;