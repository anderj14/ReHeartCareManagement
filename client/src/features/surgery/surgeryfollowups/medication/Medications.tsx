import {
  Box,
  Card,
  CardContent,
  Collapse,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Subtitle from "../../../../app/components/Subtitle";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Medication } from "../../../../app/Models/medication";
import { MdDeleteOutline, MdOutlineMode } from "react-icons/md";
import CustomButton from "../../../../app/components/CustomButton";
import { LuPlus } from "react-icons/lu";
import MedicationForm from "./MedicationForm";
import { useAppDispatch } from "../../../../app/store/configureStore";
import { removeMedication } from "./medicationSlice";
import agent from "../../../../app/api/agent";
import { fetchSugeryFollowUpsBySurgeryAsync } from "../sugeryFollowUpsSlice";
import { useParams } from "react-router-dom";

interface Props {
  medication: Medication[];
  followUpId?: any
}

export default function Medications({ medication, followUpId }: Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  const [selectedMedication, setSelectedMedication] = useState<Medication | undefined>(undefined);
  const [openForm, setOpenForm] = useState(false);
  const [target, setTarget] = useState(0);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: any }>();
  
  const reloadSurgeryFollowUp = () => {
    dispatch(fetchSugeryFollowUpsBySurgeryAsync(id));
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  }
  
  const DrawerList = (
    <Box
      sx={{
        width: 500,
        padding: "20px",
      }}
      role="presentation"
    >
     <MedicationForm 
        title={"Add Medication"}
        cancelEdit={() => setOpenForm(false)}
        medication={selectedMedication}
        surgeryFollowUpId={followUpId}
        reloadSurgeryFollowUp={reloadSurgeryFollowUp}
     />
    </Box>
  )

    const handleEditClick = (medication: Medication) => {
      if(medication) {
        setSelectedMedication(medication);
        setOpenForm(true);
      }
    }

    function handleDeleteMedication(id: number) {
      setTarget(id);
      agent.Medication.deleteMedication(id)
      .then(() => dispatch(removeMedication(id)))
      .then(() =>reloadSurgeryFollowUp())
      .catch((error) => console.log(error))
    }

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Subtitle subtitle="Medication" weight="600" />
            </Box>
            <Box>
              <CustomButton
                icon={LuPlus}
                color="#fff"
                width="180px"
                borderColor="transparent"
                onClick={toggleDrawer(true)}
              >
                Add Medication
              </CustomButton>
              <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
                {DrawerList}
              </Drawer>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Medication Name
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Dosage
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Frequency
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Route
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medication.map((med) => (
                  <React.Fragment key={med.id}>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition:
                          "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(77, 121, 151, 0.1)",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                        },
                        border: "none",
                      }}
                    >
                      <TableCell component="th" scope="row" onClick={() => handleRowClick(med.id)}>
                        {med.name}
                      </TableCell>
                      <TableCell align="right" onClick={() => handleRowClick(med.id)}>{med.dosage}</TableCell>
                      <TableCell align="right" onClick={() => handleRowClick(med.id)}>{med.frequency}</TableCell>
                      <TableCell align="right" onClick={() => handleRowClick(med.id)}>{med.route}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                          <Box>
                            <Tooltip title="Delete Medication">
                              <IconButton onClick={() => handleDeleteMedication(med.id)}>
                                <MdDeleteOutline
                                  style={{ 
                                    fontSize: "22px", 
                                    color: "#b03a2e", 
                                    cursor: "pointer",
                                  }}
                                  
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box>
                            <Tooltip title="Edit Medication">
                              <IconButton onClick={() => handleEditClick(med)}>
                                <MdOutlineMode
                                  style={{ 
                                    fontSize: "22px", 
                                    color: "#239b56", 
                                    cursor: "pointer",
                                  }}
                                  
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </Box>
                        </Box>
                         
                      </TableCell>
                    </TableRow>
                    {/* Expan */}
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{ paddingBottom: 0, paddingTop: 0, border: 'none' }}
                      >
                        <Collapse
                          in={expandedRow === med.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={2}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <IoMdInformationCircleOutline
                                style={{ fontSize: "25px" }}
                              />
                              <Subtitle
                                subtitle="Details"
                                weight="600"
                                size="18px"
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                marginTop: "10px",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Medication Name</strong> {med.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Dosage</strong> {med.dosage}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Frequency</strong> {med.frequency}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Route</strong> {med.route}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong> Notes</strong> {med.notes}
                              </Typography>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "10px", textTransform: "unset" }}
        >
          {medication.length} medication{(medication.length !> 1) ? "s" : ""} found
        </Typography>
      </Box>
    </Box>
  );
}
