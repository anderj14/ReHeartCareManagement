import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material'
import '../../app/styles/notes.scss';
import SearchIcon from '@mui/icons-material/Search';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';
import { Note } from '../../app/Models/note';
import Calendar from "../../Images/calendar.svg";
import Thunder from "../../Images/thunder.svg";

export default function Notes() {

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/notes/all')
      .then(res => res.json())
      .then(data => {
        setNotes(data.data);
        console.log(data);
      })
  }, []);

  return (
    <div className='contentNote'>
      {/* <h1>Notes List</h1> */}
      <Box className="filters">
        <div className="search">
          <TextField
            sx={{ width: '300px' }}
            id="search-bar"
            className="textField"
            // label="Search"
            variant="outlined"
            placeholder="Search Note..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="addPatientButton">
          <Button className="button" startIcon={<AddRoundedIcon />}>Add Patient</Button>
        </div>
      </Box>
      <Box className="medicalNotesContainer">
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <img src={Calendar} alt="calendar" />
          <article>
            <Typography variant='subtitle1'>Manage Your Medical Cases</Typography>
            <Typography variant='body2'>Explore the excitement of starting a new medical case</Typography>
          </article>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <img src={Thunder} alt="thunder" />
          <article>
            <Typography variant='subtitle1'>Quick Notes</Typography>
            <Typography variant='body2'>Capture your medical ideas instantly</Typography>
          </article>
        </Box>
      </Box>
      <Box className="containerCards">
        <Typography variant='subtitle1' sx={{marginBottom: '20px'}}>All notes</Typography>
        <NoteCard notes={notes} />
      </Box>
    </div>
  )
}
