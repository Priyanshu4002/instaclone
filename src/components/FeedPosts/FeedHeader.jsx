import { Avatar, Box, Button, Flex, SkeletonCircle, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

const FeedHeader = ({ post, creatorProfile }) => {
  const {isFollowing,handleFollower,isUpdating}=useFollowUser(post.createdBy);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>
            <Avatar
              src={creatorProfile.profilePicUrl}
              alt="user profile pic"
              size={"sm"}
            />
          </Link>
        ) : (
          <SkeletonCircle size={"10"} />
        )}
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              {creatorProfile.username}
            </Link>
          ) : (
            <SkeletonCircle size={"10"} />
          )}
          <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box>
        <Button
          size={'xs'}
          bg={'transparent'}
          color={"blue.500"}
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollower}
          isLoading={isUpdating}
        >
          {
            isFollowing ? 'Unfollow': 'Follow'
          }
        </Button>
      </Box>
    </Flex>
  );
};

export default FeedHeader;
