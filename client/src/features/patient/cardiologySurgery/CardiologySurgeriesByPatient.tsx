import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CustomButton from "../../../app/components/CustomButton";
import Title from "../../../app/components/Title";
import { useSurgeryByPatient } from "../../../app/hooks/useSurgery";
import RadioButtonGroup from "../../../app/components/RadioButtonGroup";
import {
  setCardiologySurgeryByPatientParams,
} from "../../surgery/surgerySlice";
import PaginationItem from "../../../app/components/PaginationItem";
import { CardiologySurgerySearch } from "../../surgery/CardiologySurgerySearch";
import CardiologySurgeryList from "../../surgery/CardiologySurgeryList";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function CardiologySurgeriesByPatient() {
  const {
    cardiologySurgeryByPatient,
    surgeryByPatientLoaded,
    status,
    patient,
    dispatch,
    cardiologySurgeryParams,
    metaDataByPatient,
  } = useSurgeryByPatient();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;

  return (
    <Box className="contentSurgery">
      <Box
        sx={{
          margin: "40px",
        }}
      >
        <Title
          title={`Cardiac Surgery History of ${patient?.patientName}`}
          weight="500"
        />
      </Box>
      <Box sx={{ margin: "40px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <CardiologySurgerySearch />
          <Box className="addFilterButton">
            <CustomButton
              onClick={handleClick}
              color="#000"
              hoverColor="#f3f3f3"
              width="100px"
              bg="#fff"
            >
              Add Filter
            </CustomButton>
            <RadioButtonGroup
              selectedValue={cardiologySurgeryParams.sort}
              options={sortOptions}
              onChange={(e) =>
                dispatch(
                  setCardiologySurgeryByPatientParams({ sort: e.target.value })
                )
              }
              id={id}
              open={open}
              anchorEl={anchorEl}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ width: "100%" }} />

      <Box sx={{ margin: "40px" }}>
        {status === "fetchCardiologySurgeriesByPatient" ||
        !surgeryByPatientLoaded ? (
          <Typography variant="h6" align="center">
            Loading Cardiology Surgeries...
          </Typography>
        ) : cardiologySurgeryByPatient.length === 0 ? (
          <Typography variant="h6" align="center">
            No Cardiology Surgery Found
          </Typography>
        ) : (
          <CardiologySurgeryList
            cardiologySurgeries={cardiologySurgeryByPatient}
          />
        )}
      </Box>
      {surgeryByPatientLoaded && (
        <Box sx={{ margin: "40px" }}>
          {metaDataByPatient && (
            <PaginationItem
              metaData={metaDataByPatient}
              onPageChange={(page: number) =>
                dispatch(
                  setCardiologySurgeryByPatientParams({ pageIndex: page })
                )
              }
              name="Surgeries"
            />
          )}
        </Box>
      )}
    </Box>
  );
}
