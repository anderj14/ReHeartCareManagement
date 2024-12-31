import { useState } from "react";
import { Box, Typography, Divider, Drawer } from "@mui/material";
import "../../app/styles/surgery.scss";
import { setCardiologySurgeryParams } from "./surgerySlice";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { CardiologySurgeryByPatientSearch } from "./CardiologySurgerySearch";
import PaginationItem from "../../app/components/PaginationItem";
import CardiologySurgeryList from "./CardiologySurgeryList";
import Title from "../../app/components/Title";
import CustomButton from "../../app/components/CustomButton";
import { useSurgery } from "../../app/hooks/useSurgery";
import CardiologySurgeryForm from "../patient/cardiologySurgery/admin-surgery/CardiologySurgeryForm";
import { CardiologySurgery } from "../../app/Models/cardiologySurgery";
import { LuPlus } from "react-icons/lu";

const sortOptions = [
  { value: "patientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function CardiologySurgeries() {
  const {
    cardiologySurgeries,
    cardiologySurgeryParams,
    dispatch,
    surgeriesLoaded,
    metaData,
    status,
  } = useSurgery();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSurgery] = useState<CardiologySurgery | undefined>(undefined);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 650, padding: "20px" }} role="presentation">
      <CardiologySurgeryForm
        surgery={selectedSurgery}
        cancelEdit={() => setOpenForm(false)}
        title={"Creating New Surgery History"}
      />
    </Box>
  );

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;

  return (
    <Box className="contentSurgery">
      <Box
        sx={{
          margin: "40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Title title="surgeries" weight="500" />
        <Box>
          <CustomButton
            open={openForm}
            onClick={toggleDrawer(true)}
            icon={LuPlus}
            color="#fff"
            width="180px"
            borderColor="transparent"
          >
            Add Surgery
          </CustomButton>
          <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
            {DrawerList}
          </Drawer>
        </Box>
      </Box>
      <Box sx={{ margin: "40px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <CardiologySurgeryByPatientSearch />
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
                dispatch(setCardiologySurgeryParams({ sort: e.target.value }))
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
        {status === "pendingFetchCardiologySurgeriesAsync" && (
          <Typography variant="h6">Loading Surgeries...</Typography>
        )}
        {surgeriesLoaded && cardiologySurgeries.length === 0 && (
          <Typography variant="h6">No Surgeries Found</Typography>
        )}
        {surgeriesLoaded && cardiologySurgeries.length > 0 && (
          <div className="surgeryList">
            <CardiologySurgeryList cardiologySurgeries={cardiologySurgeries} />
          </div>
        )}
      </Box>
      {surgeriesLoaded && (
        <Box sx={{ margin: "40px" }}>
          {metaData && (
            <PaginationItem
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setCardiologySurgeryParams({ pageIndex: page }))
              }
              name="Surgeries"
            />
          )}
        </Box>
      )}
    </Box>
  );
}
