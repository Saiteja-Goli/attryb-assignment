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
import { registerUser } from '../Fetch';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        number: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            toast({
                title: 'Failed.',
                description: "password must be at least 6 characters",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        try {
            const response = await registerUser(formData);
            console.log(response);
            toast({
                title: 'SignUp Successfull.',
                description: "Please Login",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            navigate("/user/login")
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed.',
                description: "Registration failed. Please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

        }
    }

    return (
        <Center h="100vh">
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                shadow="lg"
                width="400px"
            >
                <Heading as="h2" size="lg" mb={4}>Sign Up</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl mt={4}>
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
                    <FormControl mt={4}>
                        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                        <Input
                            type="text"
                            name="number"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.number}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Center>
    );
};

export default Signup;
