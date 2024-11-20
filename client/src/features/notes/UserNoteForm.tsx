import { Box, Grid, Typography } from "@mui/material";
import { Note } from "../../app/Models/note";
import AppTextInput from "../../app/components/AppTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../admin/noteValidation";
import AppSelectList from "../../app/components/AppSelectList";
import useNote from "../../app/hooks/useNote";
import CustomButton from "../../app/components/CustomButton";
import { useDispatch } from "react-redux";
import agent from "../../app/api/agent";
import { setNote } from "./noteSlice";
import { useEffect } from "react";

interface Props {
  note?: Note;
  cancelEdit: () => void;
  title: React.ReactNode;
}

export default function UserNoteForm({ note, cancelEdit, title }: Props) {
  const { control, reset, handleSubmit, formState: {isDirty} } = useForm({ resolver: yupResolver<any>(validationSchema) });
  const { noteStatus } = useNote();
  const dispatch = useDispatch();

  useEffect(() => {
    if (note && !isDirty) {
      const statusMatch  = noteStatus.find(
        (item) => item.noteStatusName === note.noteStatus
      );
      const noteDataWithStatusId = {
        ...note,
        noteStatusId: statusMatch ? statusMatch.id : null
      };

      reset(noteDataWithStatusId);
    }
  }, [note, reset, isDirty, noteStatus]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Note;
      if (note) {
        console.log(data);
        response = await agent.Note.updateNote(note.id, data);
      } else {
        console.log("Data to send:", data);
        response = await agent.Note.createNote(data);
      }

      dispatch(setNote(response));
      cancelEdit();
    } catch (error: any) {
      if (error.response) {
        console.log("Response error:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
    }
    
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: 400 }}>
        {title}
      </Typography>
      <Box className="noteInfo">
        <Typography variant="h6" sx={{ marginBottom: "15px", fontWeight: 400 }}>
          Note Information
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="title" label="Title" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="content" label="Content" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="date" label="Date"/>
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppSelectList
              items={noteStatus}
              control={control}
              name="noteStatusId"
              label="Note Status"
              displayField={(item) => item.noteStatusName}
            />
          </Grid> 
        </Box>
       
      </Box>
      <Box sx={{display: 'flex', gap: '10px', marginTop: '40px'}}>
        <CustomButton onClick={cancelEdit} width="120px" color="#EF4444" hoverColor="#f3f3f3" hoverTextColor="#c93b3b">Cancel</CustomButton>
        <CustomButton type='submit' width='120px' color="#0ba723" hoverColor="#f3f3f3" hoverTextColor="#098b1d">Submit</CustomButton>
        {/* <button onClick={() => handleSubmitData(data)}>Create Note</button> */}
      </Box>
    </form>
  );
}
