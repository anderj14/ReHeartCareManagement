import { Note } from '../../app/Models/note'
import { Card, CardContent, Typography, Box, CardActions, IconButton } from '@mui/material';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    notes: Note[];
}

export default function NoteCard({ notes }: Props) {
    return (
        <Box className="cards">
            {notes.map((note) => (
                <Card sx={{ minWidth: 275, display: 'flex', flexDirection: 'column' }} className='card' key={note.id}>
                    <CardContent>
                        <Typography sx={{ mb: .5, fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} color="text.primary">
                            {note.title}
                            <IconButton aria-label="update note">
                                <EditIcon />
                            </IconButton>
                        </Typography>
                        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" gutterBottom>
                            Note of day {format(new Date(note.date), 'dd/MM/yyyy')}
                        </Typography>
                        <Typography variant="body2">
                            {note.content}
                        </Typography>
                    </CardContent>
                    <Box sx={{ flexGrow: 1 }} />
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton aria-label="add note">
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label="delete note">
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}
