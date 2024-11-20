import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchNotesAsync, fetchNoteStatusAsync, noteSelectors } from '../../features/notes/noteSlice';

export default function useNote() {
    const notes = useAppSelector(noteSelectors.selectAll);
    const { notesLoaded, noteStatus, metaData, status, noteStatusLoaded } = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();
    

  useEffect(() => {
    if (!notesLoaded) dispatch(fetchNotesAsync());
  }, [notesLoaded, dispatch]);

  useEffect(() => {
    if(!noteStatusLoaded) dispatch(fetchNoteStatusAsync());
  }, [noteStatusLoaded, dispatch]);

  return {
    notes,
    notesLoaded,
    metaData,
    status,
    noteStatus,
    noteStatusLoaded
  }
}
