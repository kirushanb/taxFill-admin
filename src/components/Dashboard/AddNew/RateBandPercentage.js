import * as React from "react";
import "./RateBand.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ToastContainer } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
} from "@mui/material";

export default function RateBand() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState("");
  const [data, setData] = React.useState([]);
  const [starter, setStarter] = React.useState(undefined);
  const [base, setBase] = React.useState(undefined);
  const [higher, setHigher] = React.useState(undefined);
  const [additional, setAdditional] = React.useState(undefined);
  const [normal, setNormal] = React.useState(undefined);
  const [incomeType, setIncomeType] = React.useState("");

  const currentYear = new Date().getFullYear();

  const fetchData = async (year, type) => {
    try {
        setLoading(true);
      const response = await axiosPrivate.get(
        `https://tax.api.cyberozunu.com/api/v1.1/RateBandPercentage/year/${year}/rate-band-tax-type/${type}`
      );

      if (response.data.result.length > 0 && type && year) {
        const list = response.data.result;
        const rateBands = list.reduce((acc, curr) => {
          acc[curr.rateBand] = curr.percentage;
          return acc;
        }, {});

        setData(list);
        setStarter(rateBands[1]);
        setBase(rateBands[2]);
        setHigher(rateBands[3]);
        setAdditional(rateBands[4]);
        setNormal(rateBands[5]);
        console.log(rateBands);
        console.log("list", list);
        setLoading(false);

      } else {
        console.log("hhd");
        setData([]);
        setStarter(undefined);
        setBase(undefined);
        setHigher(undefined);
        setAdditional(undefined);
        setNormal(undefined);
        setLoading(false);

      }
    } catch (error) {
      console.error(error);
      setLoading(false);

    }
  };

  const handleUpdate = async () => {
    let payLoad = [];
    if (incomeType === 3) {
      payLoad = [
        {
          rateBand: 2,
          percentage: base,
          rateBandTaxType: 3,
          year: selectedYear.$y,
        },
        {
          rateBand: 3,
          percentage: higher,
          rateBandTaxType: 3,
          year: selectedYear.$y,
        },
        {
          rateBand: 5,
          percentage: normal,
          rateBandTaxType: 3,
          year: selectedYear.$y,
        },
      ];
    } else if(incomeType === 1) {
      payLoad = [
        {
          rateBand: 1,
          percentage: starter,
          rateBandTaxType: 1,
          year: selectedYear.$y,
        },
        {
          rateBand: 2,
          percentage: base,
          rateBandTaxType: 1,
          year: selectedYear.$y,
        },
        {
          rateBand: 3,
          percentage: higher,
          rateBandTaxType: 1,
          year: selectedYear.$y,
        },
        {
          rateBand: 4,
          percentage: additional,
          rateBandTaxType: 1,
          year: selectedYear.$y,
        },
      ];
    }else{
        payLoad = [
            {
              rateBand: 1,
              percentage: starter,
              rateBandTaxType: 2,
              year: selectedYear.$y,
            },
            {
              rateBand: 2,
              percentage: base,
              rateBandTaxType: 2,
              year: selectedYear.$y,
            },
            {
              rateBand: 3,
              percentage: higher,
              rateBandTaxType: 2,
              year: selectedYear.$y,
            },
            {
              rateBand: 4,
              percentage: additional,
              rateBandTaxType: 2,
              year: selectedYear.$y,
            },
          ];

    }

    try {
      setLoading(true);

      const response = await axiosPrivate.post(
        "https://tax.api.cyberozunu.com/api/v1.1/RateBandPercentage",
        payLoad
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChange = (date) => {
    setSelectedYear(date);
    console.log("date", date.$y);
  };

  const handleSubmit = (type) => {
    fetchData(selectedYear.$y, type);
    console.log("type", type);
  };

  const axiosPrivate = useAxiosPrivate();

  return (
    <div className="RateBand">
      <form>
        <ToastContainer />
        <Container component="main" maxWidth="lg">
          <div className="back-button" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon className="back-icon" />
            <h5 className="title is-5">Back</h5>
          </div>
          <h3 className="title is-5">Rate Band Percentage (%)</h3>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              width: "100%",
            }}
          >
            <Stack spacing={2}>
              <List
                sx={{
                  width: "50",
                  textAlign: "left",
                  maxWidth: 700,
                  bgcolor: "background.paper",
                }}
              >
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
                      maxDate={new Date(currentYear - 1, 11, 31)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </ListItem>

                  <ListItem>
                    <Typography style={{ paddingRight: "40px" }}>
                      Income Type:{" "}
                    </Typography>
                    <div>
                      <FormControl size="medium" sx={{ width: 258 }}>
                        <InputLabel id="demo-simple-select-label">
                          {"Income Type"}
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={incomeType || ""}
                          label="Income Type"
                          onChange={(e) => {
                            setIncomeType(e.target.value);
                            handleSubmit(e.target.value);
                          }}
                        >
                          <MenuItem value={1}>Saving</MenuItem>
                          <MenuItem value={2}>Divident</MenuItem>
                          <MenuItem value={3}>Capital gain</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </ListItem>

                  <div>
                    {incomeType === 3 ? (
                      <Card sx={{ width: "60ch", margin: "4ch" }}>
                        {!loading && (
                          <>
                            <ListItem>
                              <ListItemText>Normal</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={normal}
                                onChange={(e) => setNormal(e.target.value)}
                                type="number"
                              />

                              {(!normal && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  The value added
                                </p>
                              )}
                            </ListItem>

                            <ListItem>
                              <ListItemText>Base</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={base}
                                onChange={(e) => setBase(e.target.value)}
                                type="number"
                              />
                              {(!base && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  {" "}
                                  The value added
                                </p>
                              )}
                            </ListItem>
                            <ListItem>
                              <ListItemText>Higher</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={higher}
                                onChange={(e) => setHigher(e.target.value)}
                                type="number"
                              />
                              {(!higher && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  The value added
                                </p>
                              )}
                            </ListItem>
                          </>
                        )}
                      </Card>
                    ) : (
                      <Card sx={{ width: "60ch", margin: "4ch" }}>
                        {!loading && (
                          <>
                            <ListItem>
                              <ListItemText>Starter</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={starter}
                                onChange={(e) => setStarter(e.target.value)}
                                type="number"
                              />
                              {(!starter && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  The value added
                                </p>
                              )}
                            </ListItem>
                            <ListItem>
                              <ListItemText>Base</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={base}
                                onChange={(e) => setBase(e.target.value)}
                                type="number"
                              />
                              {(!base && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  The value added
                                </p>
                              )}
                            </ListItem>
                            <ListItem>
                              <ListItemText>Higher</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={higher}
                                onChange={(e) => setHigher(e.target.value)}
                                type="number"
                              />
                              {(!higher && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  The value added
                                </p>
                              )}
                            </ListItem>

                            <ListItem>
                              <ListItemText>Additional</ListItemText>
                              <TextField
                                sx={{
                                  "& > :not(style)": { m: 1, width: "20ch" },
                                }}
                                value={additional}
                                onChange={(e) => setAdditional(e.target.value)}
                                type="number"
                              />
                              {(!additional && (
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  *No value added
                                </p>
                              )) || (
                                <p
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  The value added
                                </p>
                              )}
                            </ListItem>
                          </>
                        )}
                      </Card>
                    )}
                  </div>

                  <button
                    className="button is-success"
                    disabled={loading}
                    onClick={() => handleUpdate()}
                    style={{
                      margin: "auto",
                      marginBottom: "20px",
                      marginRight: "0",
                      display: "block",
                      width: "25%",
                      fontSize: "20px",
                    }}
                  >
                    {loading ? "Update" : "Update"}
                  </button>
                </LocalizationProvider>
              </List>
            </Stack>
          </Box>
        </Container>
      </form>
    </div>
  );
}
