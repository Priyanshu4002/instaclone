import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useAuthStore from '../../store/authStore'
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';


const SuggestedHeader = () => {
  const {handleLogout,isLoggingout}= useLogout();
  const authUser=useAuthStore((state)=>state.user);
  if(!authUser) return null;
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`${authUser.username}`}>
        <Avatar name={authUser.username} size={'lg'} src={authUser.profilePicUrl}/>
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight={'bold'}>
              {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        onClick={handleLogout}
        isLoading={isLoggingout}
        bg={'transparent'}
        _hover={{bg:'transparent'}}
        size={'xs'}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        cursor={'pointer'}
      >Log out</Button>
    </Flex>
  )
}

export default SuggestedHeader
