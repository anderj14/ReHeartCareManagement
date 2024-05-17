import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { useState } from "react";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState([]);

    const handleApiError = async (apiCall: () => Promise<void>) => {
        try {
            await apiCall();
        } catch (error: any) {
            console.error("Error:", error);
            // Mostrar el mensaje de error recibido desde la API
            toast.error(error.response.data.message);
        }
    };

    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => handleApiError(agent.TestErrors.get400Error)}>Test 400 Error</Button>
                <Button variant="contained" onClick={() => handleApiError(agent.TestErrors.get401Error)}>Test 401 Error</Button>
                <Button variant="contained" onClick={() => handleApiError(agent.TestErrors.get404Error)}>Test 404 Error</Button>
                <Button variant="contained" onClick={() => handleApiError(agent.TestErrors.get500Error)}>Test 500 Error</Button>
            </ButtonGroup>
        </Container>
    );
    // return (
    //     <Container>
    //         <Typography gutterBottom variant="h2">Errors testing purposes</Typography>
    //         <ButtonGroup fullWidth>
    //             <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
    //             <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
    //             <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
    //             <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
    //         </ButtonGroup>
    //     </Container>
    // );
}
