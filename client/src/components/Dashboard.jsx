import React, { useState } from 'react';
import { Box, Button, Center, Heading, Image, ListItem, UnorderedList, useToast } from '@chakra-ui/react';
import Carform from './Car/Carform';
import CarsDetails from './Car/CarsDetails';
import Mycars from './Car/Mycars';

const Dashboard = () => {
    const [showCarForm, setShowCarForm] = useState(false);
    const [showMyCars, setShowMyCars] = useState(false);
    const [hondaCars, setHondaCars] = useState([]);
    const [show, setShow] = useState(false);

    const handleAddCar = () => {
        setShowCarForm(true);
    };

    const handleCarAdded = () => {
        setShowCarForm(false);
    };

    const showMyCarsComponent = () => {
        setShowMyCars(true);
    };

    // Function to fetch Honda cars
    const token = JSON.parse(localStorage.getItem("car-token")) || "";

    const fetchHondaCars = async () => {
        const Honda = 'Honda'
        try {
            const response = await fetch(`https://attryb-backend-saiteja-goli.vercel.app/inventory/getByTitle/${Honda}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            console.log(response)

            if (response.ok) {
                const data = await response.json();
                setHondaCars(data);
                console.log(data)
            } else {
                console.error("Failed to fetch Honda cars");
            }
        } catch (error) {
            console.error("Error fetching Honda cars:", error);
        }
    }
    const getRandomColor = (availableColors) => {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        return availableColors[randomIndex];
    };
    return (
        <div>

            <Box ml={'82%'} pt={'5%'}>
                <Button colorScheme={"purple"} mb="10px" onClick={fetchHondaCars}>Show Honda 2015</Button>
                <Button mr="20px" colorScheme={'green'} variant={'solid'} onClick={handleAddCar}>
                    Add Car
                </Button>
                <Button colorScheme={"cyan"} onClick={showMyCarsComponent}>My Cars</Button> {/* Show My Cars button */}
            </Box>
            <Box>
                {showCarForm ? (
                    <Carform onAddCar={handleCarAdded} />
                ) : showMyCars ? (
                    <Mycars />
                ) : (
                    <CarsDetails />
                )}
                {hondaCars.length > 0 ? (
                    hondaCars.map((car, index) => (
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
                                    <Center>
                                        <Heading fontSize={'30px'}>Original Description</Heading>
                                    </Center>
                                    <Center mt='10px'>
                                        <Heading fontSize={'20px'} fontFamily={'serif'}>{car.carTitle}</Heading>
                                    </Center>
                                    <Heading fontFamily={'serif'}>{car.modelName}</Heading>
                                </Box>
                            </Center>
                            <hr />
                            <Box>
                                <Center>
                                    <Heading mt='20px' fontSize={'30px'}>Present Description</Heading>
                                </Center>
                                <hr />
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
                        </Box>
                    ))
                ) : (
                    <Heading>No Honda Cars are Available</Heading>
                )}

            </Box>
        </div>
    );
};

export default Dashboard;
