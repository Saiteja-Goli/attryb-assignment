import React, { useState } from 'react';
import { Box, Button, Center, Heading, Image, ListItem, UnorderedList, useToast } from '@chakra-ui/react';
import Carform from './Car/Carform';
import CarsDetails from './Car/CarsDetails';
import Mycars from './Car/Mycars';

const Dashboard = () => {
    const [showCarForm, setShowCarForm] = useState(false);
    const [showMyCars, setShowMyCars] = useState(false);

    const handleAddCar = () => {
        setShowCarForm(true);
    };

    const handleCarAdded = () => {
        setShowCarForm(false);
    };

    const showMyCarsComponent = () => {
        setShowMyCars(true);
    };

    return (
        <div>

            <Box ml={'82%'} pt={'5%'}>
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

            </Box>
        </div>
    );
};

export default Dashboard;
