import { useState } from 'react'
import useShowToast from './useShowToast';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserProfileById = (userId) => {
 const [isLoading,setIsLoading]=useState(true);
 const [userProfile,setUserProfile]= useState(null);
 const showToast=useShowToast();

 useEffect(()=>{
    const getUser=async()=>{
       setIsLoading(true);
       setUserProfile(null);
       try {
        const userRef= await getDoc(doc(firestore,'users',userId));
        if(userRef.exists()){
            setUserProfile(userRef.data());
        }
       } catch (error) {
        showToast('Error',error.message,'error');
       } 
       finally{
        setIsLoading(false)
       }
    }
    getUser();
 },[showToast,setUserProfile,userId])

 return {isLoading,userProfile,setUserProfile}
}

export default useGetUserProfileById;
