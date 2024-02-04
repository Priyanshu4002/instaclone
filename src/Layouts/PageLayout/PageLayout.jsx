import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

const PageLayout = ({children}) => {
    const {pathname} = useLocation ();
    const [user, loading] = useAuthState(auth);
    const canSeeSidebar= pathname !== "/auth" && user;
    const haveNavbar= !user && !loading && pathname !== "/auth";
    const checkUserAuth= !user && loading;
     if(checkUserAuth) return <PagelayoutSpinner />

  return (
    <Flex direction={haveNavbar?'column':'row'}>
        {
            canSeeSidebar ? (
                <Box w={{base:"70px", md:"240px"}}>
                    <Sidebar />
                </Box>
            ): null
        }
        {
            haveNavbar ? <Navbar /> : null
        }
        <Box flex={1} w={{base:"calc(100%-70px)", md:"calc(100%-240px"}} mx={'auto'}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout


const PagelayoutSpinner=()=>{
    return(
    <Flex flexDir={'column'} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Spinner size={'xl'} />
    </Flex>
    )
}