import React, { useState } from "react";
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Button,
    Center,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
const InventoryForm = () => {

    const toast = useToast();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        carImage: "",
        carTitle: "",
        kilometersOnOdometer: "",
        majorScratches: false,
        originalPaint: false,
        accidentsReported: "",
        previousBuyers: "",
        registrationPlace: "",
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: inputValue });
    };
    const token = JSON.parse(localStorage.getItem("car-token"));
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://attryb-backend-saiteja-goli.vercel.app/inventory/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast({
                    title: "Inventory Added Successfully",
                    description: "Inventory data has been added.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setFormData({
                    carImage: "",
                    carTitle: "",
                    kilometersOnOdometer: "",
                    majorScratches: false,
                    originalPaint: false,
                    accidentsReported: "",
                    previousBuyers: "",
                    registrationPlace: "",
                });
                window.location.reload();
            }else if(response.status==401){
                toast({
                    title: "Not Authorised",
                    description: "Please Login",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to add inventory data. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Center h="100vh">

            <Box p={4} borderWidth="1px" borderRadius="lg" shadow="lg" width="400px">
                <Heading as="h2" size="lg" mb={4} back>
                    Add Inventory Data
                </Heading>
                <Box style={{ marginBottom: "1rem", fontFamily: "-moz-initial", backgroundColor: "lightblue", padding: "5px", borderRadius: "15px" }}>
                    Please fill 'carTitle' as Honda, Toyota, Ford, Chevrolet, BMW, Audi, Mercedes-Benz, Nissan, Hyundai, Volkswagen.
                </Box>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel htmlFor="carImage">
                            carImage
                        </FormLabel>
                        <Input
                            name="carImage"
                            id="carImage"
                            placeholder="Image of Car"
                            value={formData.carImage}
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
                            value={formData.carTitle}
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
                            value={formData.kilometersOnOdometer}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="majorScratches">Major Scratches</FormLabel>
                        <Checkbox
                            name="majorScratches"
                            id="majorScratches"
                            isChecked={formData.majorScratches}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel htmlFor="originalPaint">Original Paint</FormLabel>
                        <Checkbox
                            name="originalPaint"
                            id="originalPaint"
                            isChecked={formData.originalPaint}
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
                            value={formData.accidentsReported}
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
                            value={formData.previousBuyers}
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
                            value={formData.registrationPlace}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" type="submit">
                        Add Inventory
                    </Button>
                </form>
            </Box>
        </Center>
    );
};

export default InventoryForm;
