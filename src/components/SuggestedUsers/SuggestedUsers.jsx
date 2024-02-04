import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useSuggestedUser from '../../hooks/useSuggestedUser'

const SuggestedUsers = () => {
    const {isLoading,suggestedUser}=useSuggestedUser();
    if(isLoading) return null;
  return (
    <VStack py={8} px={4} gap={4} >
        <SuggestedHeader  />
        {
            suggestedUser.length !==0 && (
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
            <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={'bold'} _hover={{color:'gray.400'}} cursor={'pointer'}>
                See All
            </Text>
        </Flex>
            )
        }
            {
                suggestedUser.map((user)=>(
                    <SuggestedUser user={user} key={user.id}/>
                ))
            }
        
        <Box fontSize={12} color={"gray.500"} mt={5} alignItems={'start'}>
            @ 2024 Built By{" "}
            <Link href='https://www.instagram.com/priyanshu_3._' target='_blank' color={'blue.500'} fontSize={14} >
                MERN Stack Developer
            </Link>
        </Box>
    </VStack>
  )
}

export default SuggestedUsers
