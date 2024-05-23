import { Box, Button, Typography } from '@mui/material'
import '../../app/styles/notes.scss';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';
import Calendar from "../../Images/calendar.svg";
import Thunder from "../../Images/thunder.svg";
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchNotesAsync, noteSelectors } from './noteSlice';
import NoteSearch from './NoteSearch';

export default function Notes() {

  const notes = useAppSelector(noteSelectors.selectAll);
  const { notesLoaded, noteParams } = useAppSelector(state => state.note);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  useEffect(() => {
    if (!notesLoaded) dispatch(fetchNotesAsync());
  }, [notesLoaded, dispatch]);

  return (
    <div className='contentNote'>
      <Box className="filters">
        <div className="search">
          <NoteSearch />
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
        <Typography variant='subtitle1' sx={{ marginBottom: '20px' }}>All notes</Typography>
        <NoteCard notes={notes} />
      </Box>
    </div>
  )
}
