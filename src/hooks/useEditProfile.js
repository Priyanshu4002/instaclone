import { useState } from 'react'
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/useProfileStore';
import useShowToast from './useShowToast';
import { firestore, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const useEditProfile = () => {
  const [isUpdating,setIsUpdating]= useState(false);
  const authUser= useAuthStore(state=>state.user);
  const setAuthUser= useAuthStore(state=>state.setUser);
  const setUserProfile= useUserProfileStore(state=>state.setUserProfile);
  const showToast = useShowToast();

  const editProfile= async(inputs,selectedFile)=>{
    if(isUpdating || !authUser)return
    setIsUpdating(true)

    const storageRef= ref(storage,`profilePics/${authUser.uid}`);
    const userDocRef= doc(firestore,"users",authUser.uid);

    let URL= ""
    try {
        if(selectedFile){
            await uploadString(storageRef,selectedFile,"data_url");
            URL= await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`));
        }

        const updateUser={
            ...authUser,
            fullname: inputs.fullname || authUser.fullname,
            username: inputs.username || authUser.username,
            bio: inputs.bio || authUser.bio,
            profilePicUrl: URL || authUser.profilePicUrl,
        }

        await updateDoc(userDocRef,updateUser);
        localStorage.setItem("user-info",JSON.stringify(updateUser));
        setAuthUser(updateUser);
        setUserProfile(updateUser)
        showToast("Success",'Profile Updated Successfully!','error');
    } catch (error) {
        showToast('Error',error.message,'error');
    }
  }
  return {editProfile,isUpdating}
}

export default useEditProfile
