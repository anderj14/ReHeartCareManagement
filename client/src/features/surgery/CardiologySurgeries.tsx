import { useEffect, useState } from "react"
import { CardiologySurgery } from "../../app/Models/cardiologySurgery";
import { Box, Typography, Card, CardContent, TextField, IconButton, Button } from "@mui/material";
import Breadcrumb from "../../app/components/Breadcrumb";
import SearchIcon from "@mui/icons-material/Search";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import CardiologySurgeryList from "./CardiologySurgeryList";
import '../../app/styles/surgery.scss'


export default function CardiologySurgeries() {

  const [cardiologySurgery, setCardiologySurgery] = useState<CardiologySurgery[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/v1/CardiologySurgeries/allSurgeries')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCardiologySurgery(data.data);
      });
  }, []);

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
                <p>
                  Showing <strong>1 - 10</strong> of <strong>20</strong> result
                </p>
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>
              <div className="search">
                <TextField
                  id="search-bar"
                  className="text"
                  label="Search by name"
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon style={{ fill: "#5a9580", fontSize: '30px' }} />
                </IconButton>
              </div>
              <div className="addPatientButton">
                <Button className="button" startIcon={<AddRoundedIcon />}>Add Surgery</Button>
              </div>
              <div className="addFilterButton">
                <Button className="button" startIcon={<SortRoundedIcon />}>Filter</Button>
              </div>
            </Box>
          </div>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: '20px' }}>
        <div className="surgeryList">
          <CardiologySurgeryList cardiologySurgeries={cardiologySurgery} />
        </div>
      </Box>
    </div>
  )
}
