import { Container, Paper, Typography, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400, width: '90%', marginTop: '30px' }}>
            <Typography gutterBottom variant={'h3'}>Oops - we could not find what your are looking for!</Typography>
            <Divider />
            <Button component={Link} to='/patients' fullWidth>Go back to patients</Button>
        </Container>
    )
}
