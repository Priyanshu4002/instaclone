import { Box, Flex, Image,Text,VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import Googlelog from './Googlelog';

const AuthForm = () => {
  const [islogin, setIslogin] = useState(true);

  
  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src='/logo (1).png' h={24} cursor={"pointer"} alt='Instagram'/>
            
            {
              islogin ? <Login /> : <SignUp />
            }

            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
              <Box flex={2} h={'1px'} bg={"gray.400"} />
              <Text>OR</Text>
              <Box flex={2} h={'1px'} bg={"gray.400"} />
            </Flex>
            <Googlelog prefix={islogin? "Login":"Sign Up"} />

        </VStack>
    </Box> 
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Box mx={2} fontSize={14}>
          {islogin ? "Don't have an account" : "Already have an account"}
        </Box>
        <Box onClick={()=> setIslogin(!islogin)} color={"blue.500"} cursor={'pointer'}>
          {islogin? "Sign up" : "Log in"}
        </Box>
      </Flex>
    </Box>
    </>
  )
}

export default AuthForm
