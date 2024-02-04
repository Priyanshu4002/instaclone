import React from 'react'
import FeedHeader from './FeedHeader'
import FeedFooter from './FeedFooter'
import { Box, Image } from '@chakra-ui/react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({post}) => {
  const {userProfile}=useGetUserProfileById(post.createdBy);
  return (
    <>
      <FeedHeader post={post} creatorProfile={userProfile} />
      <Box my={4} borderRadius={4} overflow={'hidden'}>
        <Image src={post.imageURL} alt='user profile pic'/>
      </Box>
      <FeedFooter post={post} creatorProfile={userProfile}  />
    </>
  )
}

export default FeedPost
