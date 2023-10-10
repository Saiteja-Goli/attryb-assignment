import React from 'react';
import { Box, Flex, Spacer, Link, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate()
  const navbarStyles = {
    position: 'fixed', // Fixed position
    width: '100%', 
    zIndex: 1000, 
    backgroundColor: 'grey',
    py: 3,
    px: 6,
  };

  return (
    <Box sx={navbarStyles}>
      <Flex align="center" maxW="1200px" mx="auto">
        <Text onClick={()=>(navigate("/dashboard"))} fontSize="2xl" fontWeight="bold" color="black">
          My Car Dealership
        </Text>
        <Spacer />
        <Box>
          <Link
            as={RouterLink}
            to="/user/login"
            color="black"
            fontWeight="bold"
            _hover={{ textDecoration: 'none' }}
            mr={4}
          >
            <Button variant={'solid'} colorScheme='blue' fontWeight="bold">Login</Button>
          </Link>
          <Link
            as={RouterLink}
            to="/user/register"
            color="black"
            fontWeight="bold"
            _hover={{ textDecoration: 'underline' }}
          >
            <Button variant={'solid'} colorScheme='orange' fontWeight="bold">Signup</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
