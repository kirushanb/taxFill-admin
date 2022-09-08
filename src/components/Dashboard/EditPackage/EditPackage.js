import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./EditPackage.scss";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import DeleteIcon from "@mui/icons-material/Delete";
import lottie from "lottie-web";
import loadingAnim from "../../../static/working.json";
import { toast, ToastContainer } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const defaultPackages = [
  "Employment",
  "Self employment",
  "Pension Income",
  "Partnership",
  "Rental Income",
  "Dividend",
  "Bank interest",
];
const EditPackage = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [dropDownList, setDropDownList] = useState([]);

  const [list, setList] = useState([[]]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletepackage, setDeletepackage] = useState("");
  const [deletepackageId, setDeletepackageId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState(0);
  const [taxYear, setTaxYear] = useState('');
  const [serialNo, setSerialNo] = useState('');

  //console.log("status", status)

  useEffect(() => {
    const element = document.querySelector("#loading");
    
    if (element) {
      lottie.loadAnimation({
        container: element,
        animationData: loadingAnim,
        renderer: "svg", // "canvas", "html"
        loop: true, // boolean
        autoplay: true, // boolean
      });
    }
  }, [loading]);

  // for the drop down list

  const getOptionData = async () => {
   
      const response = await axiosPrivate.get(
        "http://tax.api.cyberozunu.com/api/v1.1/Configuration/order-status"
      );
     setDropDownList(response.data.result);
  };

  const getData = async () => {
   
      const response = await axiosPrivate.get(
        `https://tax.api.cyberozunu.com/api/v1.1/Order/${params.orderId}`
      );

      setList(response.data.result);
      //console.log("result", response.data.result);
      setTaxYear(response.data.result.taxYear);
      setStatus(response.data.result.status);
      setSerialNo(response.data.result.serialNo);
     
  };

  useEffect(() => {
    if (params.orderId) {
      try {
        setIsLoading(true);
        (async() => {
            await Promise.all([getData(),getOptionData()]);
            setIsLoading(false);
        })()
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      navigate("/");
    }
  }, [params.orderId]);

  const handleChange = (e) => {
    setSelectOption(e.target.value);
    setOpenPostModal(true);
    setStatus(e.target.value);
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  const hanclickEdit = (id, packageName) => {
    navigate(
      `/${packageName.toLowerCase().replace(/\s/g, "")}/${
        params.orderId
      }/?packageId=${id}`
    );
  };

  const handleAdd = (packageName) => {
    navigate(
      `/${packageName.toLowerCase().replace(/\s/g, "")}/${params.orderId}`
    );
  };

  const hanclickDelete = (id, packageName) => {
   
    setDeletepackage(packageName);
    setDeletepackageId(id);
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      if (deletepackage.toLowerCase().replace(/\s/g, "") === "employment") {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/v1.1/EmploymentDetail/${deletepackageId}`
        );
      } else if (
        deletepackage.toLowerCase().replace(/\s/g, "") === "selfemployment"
      ) {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/SelfEmployment/${deletepackageId}`
        );
      } else if (
        deletepackage.toLowerCase().replace(/\s/g, "") === "pensionincome"
      ) {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/v1.1/Pension/${deletepackageId}`
        );
      } else if (
        deletepackage.toLowerCase().replace(/\s/g, "") === "partnership"
      ) {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/v1.1/Partnership/${deletepackageId}`
        );
      } else if (
        deletepackage.toLowerCase().replace(/\s/g, "") === "rentalincome"
      ) {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/v1.1/RentalIncome/${deletepackageId}`
        );
      } else if (
        deletepackage.toLowerCase().replace(/\s/g, "") === "dividend"
      ) {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/v1.1/Dividend/${deletepackageId}`
        );
      } else if (
        deletepackage.toLowerCase().replace(/\s/g, "") === "bankinterest"
      ) {
        const response = await axiosPrivate.delete(
          `https://tax.api.cyberozunu.com/api/v1.1/BankDetail/${deletepackageId}`
        );
      }
      toast.success(`Package deleted successfully`);
      setLoading(false);
      setDeleteModal(false);
      setDeletepackage("");
      setDeletepackageId("");
      getData();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setDeleteModal(false);
      setDeletepackage("");
      setDeletepackageId("");
      if (err.response.data.isError) {
        toast.error(err.response.data.error.detail);
      }
    }
  };

  const handleOnChangeStatus = async () => {
    setIsLoading(true);

    try {
      await axiosPrivate.post(
        `http://tax.api.cyberozunu.com/api/v1.1/Order/update-status/${params.orderId}?status=${selectOption}`
      );
      toast.success(`Status Updated Successfully`);

      setIsLoading(false);
      setOpenPostModal(false);
      setSelectOption("");
      //getOptionData();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setOpenPostModal(false);
      setSelectOption("");
      if (err.response.data.isError) {
        toast.error(err.response.data.error.detail);
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {loading ? (
        <React.Fragment>
          {loading && (
            <div className="EditPackage">
              <div id="loading" className="loading" />
            </div>
          )}
        </React.Fragment>
      ) : (
        <div className="EditPackage">
          <div className="tax-edit-package">
            <div className="back-button" onClick={() => navigate(-1)}>
              <ArrowBackIosNewIcon className="back-icon" />
              <h5 className="title is-5">Back</h5>
            </div>
            <div>
              <h5 className="title is-3 header">
                #{serialNo} {taxYear ? `(Tax Year ${taxYear})` : ""} 
              </h5>
            </div>
          </div>

          <div className="heading-edit-package">
            <p
              className="title is-3 header"
              alignItems="center"
              justifyContent="center"
            >
              Update Status:{" "}
            </p>
            <div>
              <FormControl size="medium" sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">
                  {"Status"}
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleChange}
                >
                  {/* { <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'inactive'}>Inactive</MenuItem>} */}

                  {dropDownList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.values}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="content-wrapper-1">
            <div className="cards-grid-1 container">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      // height: "100vh",
                      flexGrow: 1,
                      width: "100%",
                      // overflowY: "auto",
                      textAlign: "left",
                    }}
                  >
                    {defaultPackages.map((l, i) => {
                      if (i === 0) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 0 + "-"}
                            label={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["employmentDetails"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["employmentDetails"]?.map((p, v) => (
                              <TreeItem
                                className="test"
                                nodeId={p.name + "-" + v}
                                label={
                                  <div
                                    key={p.name + "-" + v + "-"}
                                    className="sigle-line"
                                  >
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.name}
                                    </p>{" "}
                                    <div>
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      } else if (i === 1) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 1 + "-"}
                            label={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["selfEmploymentDetails"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["selfEmploymentDetails"]?.map((p, v) => (
                              <TreeItem
                                nodeId={p.name + "-" + v}
                                label={
                                  <div className="sigle-line">
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.name}
                                    </p>
                                    <div>
                                      {" "}
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      } else if (i === 2) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 2 + "-"}
                            label={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["pensionDetails"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["pensionDetails"]?.map((p, v) => (
                              <TreeItem
                                nodeId={p.name + "-" + v}
                                label={
                                  <div className="sigle-line">
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.name}
                                    </p>{" "}
                                    <div>
                                      {" "}
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      } else if (i === 3) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 3 + "-"}
                            label={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["partnershipDetails"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["partnershipDetails"]?.map((p, v) => (
                              <TreeItem
                                nodeId={p.name + "-" + v}
                                label={
                                  <div className="sigle-line">
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.name}
                                    </p>{" "}
                                    <div>
                                      {" "}
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      } else if (i === 4) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 4 + "-"}
                            label={
                              <div
                                key={l + "-" + i + "-" + 4}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["rentalIncomeDetails"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["rentalIncomeDetails"]?.map((p, v) => (
                              <TreeItem
                                nodeId={p.propertyName + "-" + v}
                                label={
                                  <div
                                    key={p.propertyName + "-" + v + "-"}
                                    className="sigle-line"
                                  >
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.propertyName}
                                    </p>{" "}
                                    <div>
                                      {" "}
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      } else if (i === 5) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 5 + "-"}
                            label={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["dividendIncomes"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["dividendIncomes"]?.map((p, v) => (
                              <TreeItem
                                nodeId={p.companyName + "-" + v}
                                label={
                                  <div
                                    key={p.companyName + "-" + v + "-"}
                                    className="sigle-line"
                                  >
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.companyName}
                                    </p>{" "}
                                    <div>
                                      {" "}
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      } else if (i === 6) {
                        return (
                          <TreeItem
                            nodeId={l + "-" + i + 6 + "-"}
                            label={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    padding: "0.5rem",
                                    margin: "0.5rem",
                                  }}
                                  className="title is-3 package-title"
                                >
                                  {l +
                                    "  " +
                                    "(" +
                                    list["bankInterestIncomes"]?.length +
                                    ")"}
                                </p>
                              </div>
                            }
                          >
                            {list["bankInterestIncomes"]?.map((p, v) => (
                              <TreeItem
                                nodeId={p.bankName + "-" + v}
                                label={
                                  <div className="sigle-line">
                                    <p
                                      style={{
                                        padding: "0.5rem",
                                        margin: "0.5rem",
                                      }}
                                      className="subtitle is-5 information-title"
                                    >
                                      {v + 1 + ". " + p.bankName}
                                    </p>{" "}
                                    <div>
                                      {" "}
                                      <button
                                        className="button is-success"
                                        onClick={() => hanclickEdit(p.id, l)}
                                        style={{ marginRight: "1rem" }}
                                      >
                                        View
                                      </button>{" "}
                                      <button
                                        className="button is-danger"
                                        onClick={() => hanclickDelete(p.id, l)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                }
                              />
                            ))}
                          </TreeItem>
                        );
                      }
                    })}
                  </TreeView>
                  <div className={`modal ${deleteModal ? "is-active" : ""}`}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                      <div className="icon-outer">
                        <DeleteIcon height="2rem" width="2rem" />
                      </div>
                      <p className="title is-5">
                        Are you sure to want to delete this package?
                      </p>
                      <div className="delete-footer">
                        <button
                          className="button is-danger"
                          onClick={handleConfirmDelete}
                        >
                          Delete
                        </button>
                        <button
                          className="button is-warning"
                          onClick={() => {
                            setDeleteModal((modal) => !modal);
                            setDeletepackage("");
                            setDeletepackageId("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <button
                      className="modal-close is-large"
                      aria-label="close"
                      onClick={() => {
                        setDeleteModal((modal) => !modal);
                        setDeletepackage("");
                        setDeletepackageId("");
                      }}
                    ></button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={`modal ${openPostModal ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className="icon-outer-success">
                <ThumbUpAltIcon height="2rem" width="2rem" />
              </div>
              <p className="title is-5">Do you want to Confirm this Status?</p>
              <div className="delete-footer">
                <button
                  className="button is-success"
                  onClick={handleOnChangeStatus}
                  disabled={isLoading}
                >
                  Confirm
                </button>

                <button
                  className="button is-warning"
                  onClick={() => {
                    setOpenPostModal((modal) => !modal);
                    selectOption("");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => {
                setOpenPostModal((modal) => !modal);
                selectOption("");
                
              }}
              disabled={isLoading}
            ></button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditPackage;
