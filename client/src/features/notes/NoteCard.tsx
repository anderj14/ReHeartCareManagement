import { Note } from "../../app/Models/note";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  IconButton,
  Drawer,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import UserNoteForm from "./UserNoteForm";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeNote } from "./noteSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  notes: Note[];
}

const statusColors: { [key: string]: string } = {
  Draft: "#ffc107",
  "In Progress": "#007bff",
  Completed: "#28a745",
  Archived: "#6c757d",
};

export default function NoteCard({ notes }: Props) {

  const [editMode, setEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditClick = (note: Note) => {
    if (note) {
      setSelectedNote(note);
      setEditMode(true);
    }
  };

  const toggleDrawer = () => {
    setEditMode(false);
  }

  function handleDeleteNote(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Note.deleteNote(id)
      .then(() => {
        dispatch(removeNote(id));
        navigate('/notes');
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Box className="cards">
      {notes.map((note) => (
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            flexDirection: "column",
          }}
          className="card"
          key={note.id}
        >
          <CardContent>
            <Typography
              sx={{ mb: 0.5, fontWeight: "500" }}
              color="text.primary"
            >
              {note.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14, mb: 1.5 }}
              color="text.secondary"
              gutterBottom
            >
              Note of day {format(new Date(note.date), "dd/MM/yyyy")}
            </Typography>
            <Typography variant="body2">{note.content}</Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1.5,
                backgroundColor: statusColors[note.noteStatus] || "#ffffff",
                padding: '3px',
                borderRadius: '4px',
                color: '#fff',
                width: 90,
                textAlign: "center",
              }}
            >
              {note.noteStatus}
            </Typography>
          </CardContent>
          <Box sx={{ flexGrow: 1 }} />
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <IconButton aria-label="update note" onClick={() => handleEditClick(note)}>
              <EditIcon/>
            </IconButton>
            <IconButton 
              aria-label="delete note" 
              onClick={() => handleDeleteNote(note.id)} 
              disabled={loading && target === note.id}
            >
              {loading && target === note.id ? (
                <CircularProgress size={24} />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
            <Drawer
              anchor="right"
              open={editMode}
              onClose={toggleDrawer}
              sx={{
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
                "& .MuiDrawer-paper": {
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                  border: "none",
                },
              }}
            >
              <Box sx={{ width: 600, p: 1 }}>
                {selectedNote && (
                  <UserNoteForm
                    note={selectedNote}
                    cancelEdit={toggleDrawer}
                    title={`Editing Note ${selectedNote.title}`}
                  />
                )}
              </Box>
            </Drawer>

          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
