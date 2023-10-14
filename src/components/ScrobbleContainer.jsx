import {Image, Stack, Td, Text, Tr, Skeleton, SkeletonText, Tbody, Tooltip} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

const ScrobbleContainer = (props) => {
    return (
        <Tr>
            <Td>
                <Stack direction={'row'} display={'flex'} alignItems={'center'}>
                    <Image mr={1}
                           boxSize='32px'
                           objectFit='cover'
                           src={props.image}
                    />
                    <StarIcon color={props.loved === 1 ? 'yellow.400' : '#d2d2d2'} mr={1}/>
                    {
                        props.name.length > 32 ?
                            <Text>
                                <abbr style={{textDecoration:'none'}} title={props.name}>{props.name.substring(0,32) + "..."}</abbr>
                            </Text>
                            :
                            <Text>
                                {props.name}
                            </Text>
                    }
                </Stack>
            </Td>
            {
                props.artist.length > 22 ?
                    <Td>
                        <abbr style={{textDecoration:'none'}} title={props.artist}>{props.artist.substring(0,22) + "..."}</abbr>
                    </Td>
                    :
                    <Td>
                        {props.artist}
                    </Td>
            }
            <Td>{props.date}</Td>
        </Tr>
    )
}

export default ScrobbleContainer;