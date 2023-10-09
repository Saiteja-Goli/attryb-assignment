import React, { useState } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Center,
    useToast,
} from '@chakra-ui/react';
import { loginUser } from '../Fetch';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const toast = useToast();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);
            console.log(response)
            if (response === 200) {
                toast({
                    title: 'Login Successful',
                    description: 'Welcome...',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/dashboard")
            } else if (response === 404) {
                toast({
                    title: 'User Not Found',
                    description: 'Please Login',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });

            } else if (response === 400) {
                toast({
                    title: 'Wrong Credentials',
                    description: 'Please Enter Correct Password',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });

            } else {
                toast({
                    title: 'An Error Occurred',
                    description: 'Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });

            }
        } catch (error) {
            console.error('Error during login:', error);
            toast({
                title: 'An Error Occurred',
                description: 'Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Center h="100vh">
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                shadow="lg"
                width="400px"
            >
                <Heading as="h2" size="lg" mb={4}>
                    Login
                </Heading>

                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" type="submit">
                        Login
                    </Button>
                </form>
            </Box>
        </Center>
    );
};

export default Login;
