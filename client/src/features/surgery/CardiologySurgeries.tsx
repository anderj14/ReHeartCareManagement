import { useEffect, useState } from "react"
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Breadcrumb from "../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import CardiologySurgeryList from "./CardiologySurgeryList";
import '../../app/styles/surgery.scss'
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchCardiologySurgeriesAsync, setCardiologySurgeryParams, surgerySelectors } from "./surgerySlice";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CardiologySurgerySearch from "./CardiologySurgerySearch";
import Pager from "../../app/components/Pager";
import PaginationItem from "../../app/components/PaginationItem";

const sortOptions = [
  { value: 'patientName', label: 'Alphabetical' },
  { value: 'dateAsc', label: 'Date - Asc to Desc' },
  { value: 'dateDesc', label: 'Date - Desc to Asc' },
]

export default function CardiologySurgeries() {

  const cardiologySurgeries = useAppSelector(surgerySelectors.selectAll);
  const { surgieriesLoaded, cardiologySurgeryParams, metaData } = useAppSelector(state => state.cardiologySurgery);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!surgieriesLoaded) dispatch(fetchCardiologySurgeriesAsync());
  }, [surgieriesLoaded, dispatch]);

  if (!surgieriesLoaded || !metaData) {
    return (
      <Typography variant="h6">Loading Surgieries...</Typography>
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  return (
    <div className="contentSurgery">
      <Breadcrumb page="surgeries" />
      <Box>
        <Typography variant="h4">Surgeries</Typography>
      </Box>
      <div className="line"></div>
      <Card>
        <CardContent>
          <div className="filtersContainer">
            <Box>
              <Typography variant="h6">Surgery List</Typography>
              <div className="pager">
                <Pager metaData={metaData} />
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>
              <div className="search">
                <CardiologySurgerySearch />
              </div>
              <div className="addPatientButton">
                <Button className="button" startIcon={<AddRoundedIcon />}>Add Surgery</Button>
              </div>
              <div className="addFilterButton">
                <Button className="button" startIcon={<SortRoundedIcon />} onClick={handleClick}>Filter</Button>
                <RadioButtonGroup
                  selectedValue={cardiologySurgeryParams.sort}
                  options={sortOptions}
                  onChange={(e) => dispatch(setCardiologySurgeryParams({ sort: e.target.value }))}
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                />
              </div>
            </Box>
          </div>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: '20px' }}>
        <div className="surgeryList">
          <CardiologySurgeryList cardiologySurgeries={cardiologySurgeries} />
        </div>
      </Box>
      <Box marginTop={'30px'}>
        <PaginationItem
          metaData={metaData}
          onPageChange={(page: number) => dispatch(setCardiologySurgeryParams({ pageIndex: page }))}
        />
      </Box>
    </div>
  )
}
