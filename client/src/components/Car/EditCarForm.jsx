import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, Input, FormLabel, Checkbox, useToast } from '@chakra-ui/react';
const EditCarForm = ({ carData, isOpen, onClose, onSave }) => {
    const [editedCarData, setEditedCarData] = useState(carData);
    const toast = useToast()
    useEffect(() => {
        setEditedCarData(carData);
    }, [carData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCarData({
            ...editedCarData,
            [name]: value,
        });
    };
    const token = localStorage.getItem('car-token');

    const handleSubmit = async () => {
        onSave(editedCarData);
        toast({
            title: 'Success.',
            description: "Updated Successfully",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Car</ModalHeader>
                <ModalBody>
                    <FormControl>
                        <FormLabel htmlFor="carImage">
                            carImage
                        </FormLabel>
                        <Input
                            name="carImage"
                            id="carImage"
                            placeholder="Image of Car"
                            value={editedCarData.carImage}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="carTitle">
                            carTitle
                        </FormLabel>
                        <Input
                            name="carTitle"
                            id="carTitle"
                            placeholder="Company Name"
                            value={editedCarData.carTitle}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="kilometersOnOdometer">
                            Kilometers on Odometer
                        </FormLabel>
                        <Input
                            type="number"
                            name="kilometersOnOdometer"
                            id="kilometersOnOdometer"
                            placeholder="Kilometers on Odometer"
                            value={editedCarData.kilometersOnOdometer}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="majorScratches">Major Scratches</FormLabel>
                        <Checkbox
                            name="majorScratches"
                            id="majorScratches"
                            isChecked={editedCarData.majorScratches}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="originalPaint">Original Paint</FormLabel>
                        <Checkbox
                            name="originalPaint"
                            id="originalPaint"
                            isChecked={editedCarData.originalPaint}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="accidentsReported">
                            Number of Accidents Reported
                        </FormLabel>
                        <Input
                            type="number"
                            name="accidentsReported"
                            id="accidentsReported"
                            placeholder="Number of Accidents Reported"
                            value={editedCarData.accidentsReported}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="previousBuyers">
                            Number of Previous Buyers
                        </FormLabel>
                        <Input
                            type="number"
                            name="previousBuyers"
                            id="previousBuyers"
                            placeholder="Number of Previous Buyers"
                            value={editedCarData.previousBuyers}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="registrationPlace">
                            Registration Place
                        </FormLabel>
                        <Input
                            type="text"
                            name="registrationPlace"
                            id="registrationPlace"
                            placeholder="Registration Place"
                            value={editedCarData.registrationPlace}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditCarForm;
