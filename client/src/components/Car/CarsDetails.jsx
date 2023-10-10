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
  Select,
  Text,
} from '@chakra-ui/react';

const CarsDetails = () => {
  const toast = useToast();
  const [carDetails, setCarDetails] = useState([]);

  const [filterPrice, setFilterPrice] = useState('');
  const [filterColor, setFilterColor] = useState(''); // State for Color filter
  const [filterMileage, setFilterMileage] = useState('');

  const token = localStorage.getItem('car-token');

  // useEffect(() => {
  //   fetch('http://localhost:8000/sechandcars', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCarDetails(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/sechandcars`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCarDetails(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [filterMileage, filterPrice]);
  const getRandomColor = (availableColors) => {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
  };

  // Function to handle filter changes and fetch filtered data
  const handleFilterChange = () => {
    let obj = { filterPrice, filterMileage }
    fetch(`http://localhost:8000/sechandcars/filtercars?listPrice=${filterPrice}&mileage=${filterMileage}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((data) => {
        setCarDetails(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };


  return (
    <div>


      <Select
        value={filterPrice}
        onChange={(e) => setFilterPrice(e.target.value)}
        placeholder="Filter by Price"
      >
        <option value="">All Prices</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </Select>

      {/* Mileage Filter */}
      <Select
        value={filterMileage}
        onChange={(e) => setFilterMileage(e.target.value)}
        placeholder="Filter by Mileage"
      >
        <option value="">All Mileages</option>
        <option value="asc">Mileage: Low to High</option>
        <option value="desc">Mileage: High to Low</option>
      </Select>
      <Button onClick={handleFilterChange}>ApplyFilters</Button>

      <Box display={'grid'} gridTemplateColumns=' 1fr 1fr'>
        {carDetails.length > 0 ?
          carDetails.map((car, index) => (
            <Box
              key={index}
              w={'97%'}
              height={'1000px'}
              borderRadius={'20px 20px 0 0 '}
              m="40px -30px 20px 30px"
              boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.21) 0px 3px 6px"
            >
              <Image
                src={car.carImage}
                alt={car.carTitle}
                w={'100%'}
                height={'50%'}
                borderRadius={'20px 20px 0 0 '}
                mr={'30px'}
              />
              <Center>

                <Box mt="20px">
                  <Center><Text fontSize={'30px'}>Original Description</Text></Center>
                  <Center mt='10px'><Heading fontSize={'20px'} fontFamily={'serif'}>  {car.carTitle}</Heading></Center>
                  <Heading fontFamily={'serif'}>{car.modelName}</Heading>
                  <hr></hr>
                  <UnorderedList fontFamily={'mono'}>
                    <ListItem>
                      <strong>Mileage:</strong> {car.oemData.mileage} Miles                    </ListItem>
                    <ListItem>
                      <strong>Power (BHP):</strong> {car.oemData.powerBHP} MPG
                    </ListItem>
                    <ListItem>
                      <strong>Max Speed:</strong> {car.oemData.maxSpeed} MPH
                    </ListItem>
                    <ListItem>
                      <strong>Price:</strong> {car.oemData.listPrice}
                    </ListItem>
                    <ListItem>
                      <strong>Year:</strong> {car.oemData.year}
                    </ListItem>
                    <ListItem>
                      <strong>Random Color:</strong> {getRandomColor(car.oemData.availableColors)}
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Center>
              <hr></hr>
              <Center>
                <Box>
                  <Center><Text mt='20px' fontSize={'30px'}>Present Description</Text></Center>
                  <hr></hr>
                  <UnorderedList fontFamily={'mono'}>
                    <ListItem>
                      <strong>kilometersOnOdometer:</strong> {car.kilometersOnOdometer}
                    </ListItem>
                    <ListItem>
                      <strong>majorScratches:</strong> {car.majorScratches ? "Yes" : "No"}
                    </ListItem>
                    <ListItem>
                      <strong>originalPaint:</strong> {car.originalPaint ? "Yes" : "No"}
                    </ListItem>
                    <ListItem>
                      <strong>accidentsReported:</strong> {car.accidentsReported}
                    </ListItem>
                    <ListItem>
                      <strong>previousBuyers:</strong> {car.previousBuyers}
                    </ListItem>
                    <ListItem>
                      <strong>registrationPlace:</strong> {car.registrationPlace}
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Center>
            </Box>
          )) : <Box><Heading >No Cars Available</Heading></Box>}
      </Box>
    </div >
  );
};

export default CarsDetails;
