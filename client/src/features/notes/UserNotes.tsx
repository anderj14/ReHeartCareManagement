import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "../../app/styles/notes.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NoteCard from "./NoteCard";
import { useState } from "react";
import Calendar from "../../Images/calendar.svg";
import Thunder from "../../Images/thunder.svg";
import { useAppDispatch } from "../../app/store/configureStore";
import { setNoteParams, setPageIndex } from "./noteSlice";
import NoteSearch from "./NoteSearch";
import useNote from "../../app/hooks/useNote";
import PaginationItem from "../../app/components/PaginationItem";
import { Note } from "../../app/Models/note";
import UserNoteForm from "./UserNoteForm";

export default function UserNotes() {
  const { notes, notesLoaded, noteStatus, metaData, status } = useNote();
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [selectedNote] = useState<Note | undefined>(undefined);
  const [openForm, setOpenForm] = useState(false);

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
    dispatch(setNoteParams({ notestatusId: event.target.value }));
  };

  const toggleDrawer = (open: boolean) => () => {
    setOpenForm(open);
  }

  const DrawerList =(
    <Box sx={{with: 650, padding: '20px'}} role="presentation">
      <UserNoteForm note={selectedNote} cancelEdit={() => setOpenForm(false)} title={'Creating new Note'}/>
    </Box>
  )

  return (
    <div className="contentNote">
      <Box className="filters">
        <Box className="search" sx={{display: 'flex', gap: '10px'}}>
          <NoteSearch />
          <FormControl>
            <InputLabel id="status-select-label">Note Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={selectedStatus}
              label="Note Status"
              onChange={handleStatusChange}
              sx={{ height: 40 }}
            >
              <MenuItem value={0}>All Statuses</MenuItem>
              {noteStatus.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.noteStatusName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div className="addNoteButton">
          <Button className="button" startIcon={<AddRoundedIcon />} onClick={toggleDrawer(true)}>
            Add Notes
          </Button>
          <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
            <Box sx={{ width: 600, p: 1 }}>
              {DrawerList}
            </Box>
          </Drawer>
        </div>
      </Box>
      <Box className="medicalNotesContainer">
        <Box sx={{ display: "flex", gap: "10px" }}>
          <img src={Calendar} alt="calendar" />
          <article>
            <Typography variant="subtitle1">
              Manage Your Medical Cases
            </Typography>
            <Typography variant="body2">
              Explore the excitement of starting a new medical case
            </Typography>
          </article>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <img src={Thunder} alt="thunder" />
          <article>
            <Typography variant="subtitle1">Quick Notes</Typography>
            <Typography variant="body2">
              Capture your medical ideas instantly
            </Typography>
          </article>
        </Box>
      </Box>
      <Box className="containerCards">
        <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
          All notes
        </Typography>
        {status === "pendingFetchNotesAsync" && (
          <Typography variant="h6">Loading Notes...</Typography>
        )}
        {notesLoaded && notes.length === 0 && (
          <Typography variant="h6">Not Note Found</Typography>
        )}
        {notesLoaded && notes.length > 0 &&( 
          <NoteCard notes={notes} />
        )}
      </Box>

      <Box marginTop='30px'>
        {metaData && metaData.count > 0 && (
            <PaginationItem
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setPageIndex({ pageIndex: page }))}
              name='Notes'
            />
        )}
      </Box>
    </div>
  );
}
