import * as React from "react";
import "./PackageList.scss";
import { ToastContainer } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/material";
import PriceListItem from "./PriceListItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { TextField } from "@mui/material";

export default function PackageList() {
  const navigate = useNavigate();
  const [packages, setPackages] = React.useState([]);
  const [selectedYear, setSelectedYear] = React.useState("");

  const currentYear = new Date().getFullYear();
  const axiosPrivate = useAxiosPrivate();

  const getPackage = async () => {
    try {
      const response = await axiosPrivate.get(
        `https://tax.api.cyberozunu.com/api/v1.1/Package/package-details/${
          selectedYear.$y || currentYear
        }`
      );
      setPackages(response.data?.result?.data || []);
      console.log("data", response.data?.result?.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getPackage();
  }, [selectedYear]);

  const handleChange = (date) => {
    setSelectedYear(date);
    console.log("date", date.$y);
  };

  return (
    <div className="PackageList">
      <div className="form">
        <ToastContainer />
        <Container component="main" maxWidth="lg">
          <div className="back-button" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon className="back-icon" />
            <h5 className="title is-5">Back</h5>
          </div>
          <h3 className="title is-5">Pakcages</h3>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              width: "100%",
            }}
          >
            <Stack spacing={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ListItem>
                  <Typography style={{ paddingRight: "10px" }}>
                    Select a tax year:{" "}
                  </Typography>
                  <DatePicker
                    views={["year"]}
                    label={"Tax Year"}
                    value={selectedYear || ""}
                    onChange={handleChange}
                    minDate={new Date(0, 0, 1)}
                    maxDate={new Date(currentYear + 1, 11, 31)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </ListItem>
              </LocalizationProvider>

              {packages.map((item) => (
                <PriceListItem
                  item={item}
                  key={item.id}
                  year={selectedYear.$y}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </div>
    </div>
  );
}
