import { Box, Button, Center, Heading, Image, ListItem, UnorderedList, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EditCarForm from './EditCarForm'

const Mycars = () => {
    const token = JSON.parse(localStorage.getItem("car-token")) || "";
    console.log("TOKEN",token)
    const toast = useToast()
    const [myCars, setMyCars] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState(null);

    useEffect(() => {

        fetch("https://attryb-backend-saiteja-goli.vercel.app/inventory/get", {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
                console.log("MyCars: ", data)
                setMyCars(data)
            }).catch(err => console.log(err))
    }, [])
    //Delete Operation
    const handleDeleteClick = (carId) => {
        // Performing the deletion action here
        fetch(`https://attryb-backend-saiteja-goli.vercel.app/inventory/delete/${carId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Car deleted successfully:', data);
                // Update the carDetails state to reflect the changes
                setMyCars((prevCarDetails) =>
                    prevCarDetails.filter((car) => car._id !== carId)
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
    //Edit Operation
    const handleEditClick = (car, index) => {
        setEditingCar(car);
        setIsEditModalOpen(true);
    };
    const handleEditSave = async (editedCarData) => {
        try {
            const response = await fetch(`https://attryb-backend-saiteja-goli.vercel.app/inventory/edit/${editedCarData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedCarData),
            });

            if (response.ok) {
                const updatedCar = await response.json();
                setIsEditModalOpen(false);
                setMyCars((prevCarDetails) =>
                    prevCarDetails.map((car) =>
                        car._id === updatedCar._id ? updatedCar : car
                    )
                );
            } else {
                console.error('Error updating car:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };
    return (
        <div>
            <Center mt="20px" mb="20px"><Heading>My Cars</Heading></Center>
            <Box display={'grid'} gridTemplateColumns="1fr 1fr">
                {
                    myCars.length > 0 ? (
                        myCars.map((car, index) => (<Box key={'index'}
                            w={'97%'}
                            height={'700px'}
                            borderRadius={'20px 20px 0 0 '}
                            m="40px -30px 20px 0px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.21) 0px 3px 6px">
                            <Image src={car.carImage} alt={car.carTitle} w={'100%'}
                                height={'60%'}
                                borderRadius={'20px 20px 0 0 '}
                                mr={'30px'} />
                            <Center mt='20px' mb='20px'><Heading fontSize={'25px'} fontFamily={'serif'}>  {car.carTitle}</Heading></Center>
                            <Center>
                                {/* <Heading fontFamily={'serif'}>{car.modelName}</Heading> */}

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
                            </Center>
                            <Center>
                                <Button mt='10px' mr='5px' onClick={() => handleEditClick(car, index)} colorScheme={'whatsapp'}>Edit</Button>
                                <Button mt='10px' ml='5px' colorScheme={'red'}
                                    onClick={() => handleDeleteClick(car._id)}>Delete</Button>
                            </Center>
                        </Box>
                        ))
                    )
                        : (<Heading> Please Add Cars</Heading>)
                }
                {/* Edit Car Modal */}
                {editingCar && (
                    <EditCarForm
                        carData={editingCar}
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleEditSave}
                    />
                )}
            </Box>
        </div>
    )
}

export default Mycars
