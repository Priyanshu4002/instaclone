import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useCommentUser from "../../hooks/useCommentUser";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import {timeAgo} from '../../utils/timeAgo.js';
import CommentsModal from "../../Modals/CommentModel.jsx";

const FeedFooter = ({ post, creatorProfile, isProfilePage }) => {
  const {isOpen,onOpen,onClose}=useDisclosure();
  const [comment, setComment] = useState("");
  const { isCommenting, handlePostComment } = useCommentUser();
  const authUser = useAuthStore((state) => state.user);
  const commentRef= useRef(null);
  const {handleLikePost,isLiked,likes}= useLikePost(post)
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box my={4} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={()=>commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {
        !isProfilePage && (
          <Text size={12} color={'gray'}>
           Posted {
              timeAgo(post.createdAt)
            }
          </Text>
        )
      }
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.username}_{" "}
            <Text as={"span"} fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {
            post.comments.length > 0 && (
              <Text fontSize={"sm"} color={"gray"} onClick={onOpen}>
                View all {post.comments.length} comments
              </Text>
            )}
            {
             isOpen ? <CommentsModal post={post} isOpen={isOpen} onClose={onClose}/> : null 
            }
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder="Add a comment..."
              fontSize={14}
              value={comment}
              ref={commentRef}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{
                  color: "white",
                }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default FeedFooter;
