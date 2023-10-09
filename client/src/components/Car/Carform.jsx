import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
} from '@chakra-ui/react';

const Carform = ({ onAddCar }) => {
    const [formData, setFormData] = useState({
        modelName: '',
        year: '',
        listPrice: '',
        mileage: '',
        availableColors: [],
        powerBHP: '',
        maxSpeed: '',
        imageUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleColorChange = (selectedColors) => {
        setFormData({
            ...formData,
            availableColors: selectedColors,
        });
    };
    // Call the parent component's callback to notify that a car has been added
    const handleCarAdded = () => {
        // Send formData to API
        fetch("http://localhost:3001/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            }).catch(err => console.log(err))
        onAddCar();
    };

    return (
        <Box maxW="400px" m="auto">
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Model Name</FormLabel>
                    <Input
                        type="text"
                        name="modelName"
                        value={formData.modelName}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                        type="text"
                        name="imageUrl" 
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Year</FormLabel>
                    <Input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>List Price (USD)</FormLabel>
                    <Input
                        type="number"
                        name="listPrice"
                        value={formData.listPrice}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Available Colors</FormLabel>
                    <Select
                        name="availableColors"
                        multiple
                        value={formData.availableColors}
                        onChange={(e) => handleColorChange(e.target.selectedOptions)}
                    >
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Silver">Silver</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Mileage (MPG)</FormLabel>
                    <Input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Power (BHP)</FormLabel>
                    <Input
                        type="number"
                        name="powerBHP"
                        value={formData.powerBHP}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Max Speed (mph)</FormLabel>
                    <Input
                        type="number"
                        name="maxSpeed"
                        value={formData.maxSpeed}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <Button colorScheme="blue" onClick={handleCarAdded}>
                    Submit
                </Button>
            </VStack>
        </Box>
    );
};

export default Carform;
