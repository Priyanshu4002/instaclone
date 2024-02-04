import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import useFollowUser from '../../hooks/useFollowUser'
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';

const SuggestedUser = ({user,setUser}) => {
  const {isFollowing,isUpdating,handleFollower}= useFollowUser(user.uid);
  const authUser= useAuthStore(state=>state.user);

  const onFollowUser=async()=>{
    await handleFollower();
    setUser({
      ...user,
      follower:isFollowing? user.follower.filter((followers)=> followers.uid !== authUser.uid): [...user.follower,authUser],
    })
  }

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar src={user.profilePicUrl} name={user.fullname} size={'md'} />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
            <Box fontSize={12} fontWeight={'bold'}>
              <Link to={`/${user.username}`}>
                  {user.fullname}
              </Link>
            </Box>
             <Box fontSize={11} color={'gray.500'}>
                {user.follower.length} {' '} followers
            </Box>
        </VStack>
      </Flex>
      {
        authUser.uid !== user.uid && 
        (<Button 
        fontSize={13} 
        p={0} 
        h={'max-content'} 
        fontWeight={'medium'} 
        color={'blue.400'} 
        _hover={{color:'white'}} 
        bg={'transparent'} 
        onClick={onFollowUser}
        isLoading={isUpdating}>
        {isFollowing ? 'Unfollow' : 'Follow' }
      </Button>)
      }
    </Flex>
  )
}

export default SuggestedUser
