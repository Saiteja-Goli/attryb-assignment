import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Image,
  UnorderedList,
  ListItem,
  Button,
  useToast,
  Center,
} from '@chakra-ui/react';

const CarsDetails = () => {
  const toast = useToast();
  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/cars')
      .then((res) => res.json())
      .then((data) => {
        setCarDetails(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteClick = (carId) => {
    // Performing the deletion action here
    fetch(`http://localhost:3001/cars/${carId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Car deleted successfully:', data);
        // Update the carDetails state to reflect the changes
        setCarDetails((prevCarDetails) =>
          prevCarDetails.filter((car) => car.id !== carId)
        );
        toast({
          title: 'Delete',
          description: 'Car Deleted Successfully',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.error('Error deleting car:', error);
      });
  };

  return (
    <div>
      <Box display={'grid'} gridTemplateColumns=' 1fr 1fr 1fr'>
        {carDetails &&
          carDetails.map((car, index) => (
            <Box
              key={index}
              w={'97%'}
              height={'600px'}
              borderRadius={'20px 20px 0 0 '}
              m="40px -30px 20px 30px"
              boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.21) 0px 3px 6px"
            >
              <Image
                src={car.imageUrl}
                alt={car.modelName}
                w={'100%'}
                height={'50%'}
                borderRadius={'20px 20px 0 0 '}
                mr={'30px'}
              />
              <Center>
                <Box mt="20px">
                  <Heading fontFamily={'serif'}>{car.modelName}</Heading>
                  <hr></hr>
                  <UnorderedList fontFamily={'mono'}>
                    <ListItem>
                      <strong>Mileage:</strong> {car.mileage}
                    </ListItem>
                    <ListItem>
                      <strong>Power (BHP):</strong> {car.powerBHP}
                    </ListItem>
                    <ListItem>
                      <strong>Max Speed:</strong> {car.maxSpeed}
                    </ListItem>
                    <ListItem>
                      <strong>Price:</strong> {car.listPrice}
                    </ListItem>
                    <ListItem>
                      <strong>Year:</strong> {car.year}
                    </ListItem>
                  </UnorderedList>
                  <Button mt={'35px'} width="140px"
                    colorScheme={'red'}
                    onClick={() => handleDeleteClick(car.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Center>
            </Box>
          ))}
      </Box>
    </div >
  );
};

export default CarsDetails;
