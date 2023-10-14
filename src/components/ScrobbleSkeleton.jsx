import {Image, Stack, Td, Text, Tr, Skeleton, SkeletonText, Tbody} from "@chakra-ui/react";

const ScrobbleSkeleton = (props) => {
    return (
        <Tr>
            <Td>
                <Stack direction={'row'} display={'flex'} alignItems={'center'}>
                    <Image mr={1}
                           boxSize='32px'
                           objectFit='cover'
                           src={props.image}
                    />
                    <Text as={'b'}>loading...</Text>
                </Stack>
            </Td>
            <Td>loading...</Td>
            <Td>loading...</Td>
        </Tr>
    )
}

export default ScrobbleSkeleton;