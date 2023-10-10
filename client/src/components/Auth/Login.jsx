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
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);
            console.log("response,", response);
            const token = localStorage.setItem('car-token', JSON.stringify(response.data1.token));
            if (response.ok) {
                const data = await response.json();
                const token = data.token; // Replace this with the actual key in your response
                localStorage.setItem("car-token", JSON.stringify(token));
              }
            if (response.data === 200) {
                toast({
                    title: 'Login Successful',
                    description: 'Welcome...',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoggedIn(true); // Update login status
                navigate("/dashboard");
            } else if (response.data === 404) {
                toast({
                    title: 'User Not Found',
                    description: 'Please SignUp',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
            } else if (response.data === 400) {
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
                    {isLoggedIn ? 'Logout' : 'Login'} {/* Change text based on login status */}
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
                        {isLoggedIn ? 'Logout' : 'Login'} 
                    </Button>
                </form>
            </Box>
        </Center>
    );
};

export default Login;
