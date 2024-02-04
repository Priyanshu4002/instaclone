import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Googlelog = ({prefix}) => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const showToast=useShowToast();
    const loginUser= useAuthStore(state=>state.login);

    const handleGoogleAuth=async()=>{
        try {
            const newUser= await signInWithGoogle();
            if(!newUser && error){
                return showToast('Error'.error.message,'error');
            }

            const docRef = doc(firestore, "users", newUser.user.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                //login
                const userDocs=docSnap.data();
                localStorage.setItem('user-info',JSON.stringify(userDocs));
                loginUser(userDocs);
            }else{
                const userDocs={
                    uid:newUser.user.uid,
                    email:newUser.user.email,
                    username:newUser.user.email.split('@')[0],
                    fullname:newUser.user.displayName,
                    bio:"",
                    profilePicUrl:newUser.user.photoURL,
                    follower:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDocs);
                localStorage.setItem('user-info',JSON.stringify(userDocs));
                loginUser(userDocs);
            }

        } catch (error) {
            showToast('Error',error.message,'error');
        }
    }

  return (
    <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'} onClick={handleGoogleAuth}>
      <Image src='/google.png' w={5} alt='Google logo'/>
      <Text mx={'2'} color={'blue.500'}>
        {prefix} with Google
      </Text>
    </Flex>
  )
}

export default Googlelog
