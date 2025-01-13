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
import Subtitle from "../../../app/components/Subtitle";
import { SurgeryFollowUp } from "../../../app/Models/SurgeryFollowUp";
import formatDateTime from "../../../app/components/formatDateTime";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineMode } from "react-icons/md";
import { useState } from "react";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Medications from "./medication/Medications";
import CustomButton from "../../../app/components/CustomButton";
import { LuPlus } from "react-icons/lu";
import SurgeryFollowUpForm from "./SurgeryFollowUpForm";
import { useAppSelector } from "../../../app/store/configureStore";
import { surgerySelectors } from "../surgerySlice";
import { useParams } from "react-router-dom";
import agent from "../../../app/api/agent";
import { removeSurgeryFollowUp, setSurgeryFollowUpParams } from "./sugeryFollowUpsSlice";
import PaginationItem from "../../../app/components/PaginationItem";
import useSurgeryFollowUp from "../../../app/hooks/useSurgeryFollowUp";

interface Props {
  surgeryFollowUp: SurgeryFollowUp[];
}

export default function SurgeryFollowUps({ surgeryFollowUp }: Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSurgeryFollowUp, setSelectedSurgeryFollowUp] = useState<SurgeryFollowUp | undefined>(undefined);
  const [formTitle, setFormTitle] = useState("Creating New Surgery Follow Up");
  const { id } = useParams<{ id: any }>();
  const [target, setTarget] = useState(0);

  const {dispatch, surgeryFollowUpByCardiologySurgeryLodaded, metaData} = useSurgeryFollowUp();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
    if (!newOpen) {
      setSelectedSurgeryFollowUp(undefined);
    }
  }

  const surgery = useAppSelector((state) => surgerySelectors.selectById(state, id));

  const DrawerList = (
    <Box sx={{ width: 550, padding: "20px" }} role="presentation">
      <SurgeryFollowUpForm
        followUp={selectedSurgeryFollowUp}
        cancelEdit={() => setOpenForm(false)}
        title={formTitle}
        surgeryId={surgery.id}
      />
    </Box>
  )

  const handleEditClick = (surgeryFollowUp: SurgeryFollowUp) => {
    if(surgeryFollowUp) {
      setSelectedSurgeryFollowUp(surgeryFollowUp);
      setFormTitle("Editing Surgery Follow-Up");
      setOpenForm(true);
    }
  }

  function handleDeleteNote(id: number) {
    setTarget(id);
    agent.SurgeryFollowUp.deleteSurgeryFollowUp(id)
      .then(() => dispatch(removeSurgeryFollowUp(id)))
      .catch(error => console.log(error))
  }

  const handleRowClick = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Subtitle subtitle="Follow-Ups" weight="600" />
            <Box>
              <CustomButton
                icon={LuPlus}
                color="#fff"
                width="180px"
                borderColor="transparent"
                onClick={toggleDrawer(true)}
              >
                Add Follow Up
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
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Follow-Up Complete
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Complications
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surgeryFollowUp.map((followUp) => (
                  <React.Fragment key={followUp.id}>
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
                      <TableCell component="th" scope="row" onClick={() => handleRowClick(followUp.id)}>
                        {formatDateTime(followUp.followUpDate)}
                      </TableCell>
                      <TableCell align="right" onClick={() => handleRowClick(followUp.id)}>
                        {followUp.isFollowUpComplete ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right" onClick={() => handleRowClick(followUp.id)}>
                        {followUp.complications}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                        <Box>
                            <Tooltip title="Delete Follow-Up">
                              <IconButton onClick={() => handleDeleteNote(followUp.id)}>
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
                            <Tooltip title="Edit Follow-Up">
                              <IconButton onClick={() => handleEditClick(followUp)}>
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
                          in={expandedRow === followUp.id}
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
                                <strong>Follow-Up Date</strong>{" "}
                                {formatDateTime(followUp.followUpDate)}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Complications</strong>{" "}
                                {followUp.complications}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Recommendations</strong>{" "}
                                {followUp.recommendations}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Functional Assessment</strong>{" "}
                                {followUp.functionalAssessment}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Follow-Up Notes</strong>{" "}
                                {followUp.followUpNotes}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                color="text.secondary"
                              >
                                <strong>Follow-Up Complete</strong>{" "}
                                {followUp.isFollowUpComplete ? "Yes" : "No"}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{marginBottom: "20px"}}>
                            <Medications medication={followUp.medications} followUpId={followUp.id} />
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

        {/* Pagination */}
        {surgeryFollowUpByCardiologySurgeryLodaded && (
          <Box sx={{ margin: "40px" }}>
            {metaData && (
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setSurgeryFollowUpParams({ pageIndex: page }))
                }
                name="Follow-Ups"
              />
            )}
          </Box>
        )}

      </Card>
    </Box>
  );
}
