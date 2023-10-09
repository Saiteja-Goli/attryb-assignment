import React, { useState } from 'react';
import { Box, Button, Select } from '@chakra-ui/react';
import Carform from './Car/Carform';
import CarsDetails from './Car/CarsDetails';
 // Import the MyCars component
import Mycars from './Car/Mycars';

const Dashboard = () => {
    const [showCarForm, setShowCarForm] = useState(false);
    const [priceSortOrder, setPriceSortOrder] = useState('');
    const [mileageSortOrder, setMileageSortOrder] = useState('');
    const [showMyCars, setShowMyCars] = useState(false); // State variable for MyCars component

    // Adding Car Details
    const handleAddCar = () => {
        setShowCarForm(true);
    };

    const handleCarAdded = () => {
        setShowCarForm(false);
    };

    const applySorting = () => {
        console.log('Price Sort Order:', priceSortOrder);
        console.log('Mileage Sort Order:', mileageSortOrder);
    };

    // Function to show MyCars component
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
            <Box m={4}>
                <Select
                    value={priceSortOrder}
                    onChange={(e) => setPriceSortOrder(e.target.value)}
                >
                    <option value="">Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </Select>
                <Select
                    value={mileageSortOrder}
                    onChange={(e) => setMileageSortOrder(e.target.value)}
                >
                    <option value="">Mileage</option>
                    <option value="asc">Mileage: Low to High</option>
                    <option value="desc">Mileage: High to Low</option>
                </Select>
                <Button
                    colorScheme={'blue'}
                    variant={'solid'}
                    onClick={applySorting}
                >
                    Apply Sorting
                </Button>
            </Box>
            <Box>
                {showCarForm ? (
                    <Carform onAddCar={handleCarAdded} />
                ) : showMyCars ? (
                    <Mycars /> // Render MyCars component when showMyCars is true
                ) : (
                    <CarsDetails
                        priceSortOrder={priceSortOrder}
                        mileageSortOrder={mileageSortOrder}
                    />
                )}
            </Box>
        </div>
    )
};

export default Dashboard;
