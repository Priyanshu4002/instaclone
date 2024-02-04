import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import useSignUpEandP from "../../hooks/useSignUpEandP";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword,setShowPassword]=useState(false);
  const {error,loading,signup} = useSignUpEandP();
  return (
    <>
      <Input
        placeholder="Full Name"
        value={inputs.fullname}
        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
        type="text"
        fontSize={14}
        size={'sm'}
      />
      <Input
        placeholder="Username"
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        type="text"
        fontSize={14}
        size={'sm'}
      />
      <Input
        placeholder="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        type="email"
        fontSize={14}
        size={'sm'}
      />
      <InputGroup>
        <Input
            placeholder="password"
            value={inputs.password}
            size={'sm'}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            type={showPassword?"text":"password"}
            fontSize={14}
        />
        <InputRightElement h={"full"}>
            <Button variant={'ghost'} size={'sm'} onClick={()=>setShowPassword(!showPassword)}>
                {showPassword? <ViewIcon />:<ViewOffIcon />}
            </Button>
        </InputRightElement>
      </InputGroup>
        {
            error && (
                <Alert status='error'fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12}/>
                    {error.message}
                </Alert>
            )
        }
      <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14}
        isLoading={loading}
        onClick={()=>signup(inputs)}>Sign Up</Button>
    </>
  );
};

export default SignUp;
