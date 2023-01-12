import * as React from 'react';
import "./ConfigurationList.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import UserListTable from './UserListTable';
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";


import {
	Box,
	Container,
	TextField,
	Grid,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,

} from "@mui/material";
import { useEffect } from 'react';

export default function NewUserList() {

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [tableData, setTableData] = React.useState([])
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [formInputData, setformInputData] = React.useState(
		{
			firstName: '',
			lastName: '',
			email: '',
			userName: '',
			password: '',
			phonenumber: '',
			twoFactorSwitch: false,

		}
	);
	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required("Password must not be empty"),
		confirmPassword: Yup.string()
			.required("Confirm Password must not be empty")
			.oneOf(
				[Yup.ref("password"), null],
				"Confirm passwords must match password above."
			)
	});

	const formOptions = {
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  };

	const { handleSubmit, register, formState, setValue, trigger, reset } = useForm(formOptions);
	const { errors } = formState;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	};

	const axiosPrivate = useAxiosPrivate();


	const onSubmit = async (data,e) => {
	e.preventDefault()
  setLoading(true)
		try {

			const response = await axiosPrivate.post(`https://tax.api.cyberozunu.com/api/v1.1/Authentication/add-admin-user`,
				{
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					password: data.password,
					userName: data.userName,
					roleId: "082C8CAF-C995-4C3D-89CF-BB2C4840FCC4"

				});
			console.log("FormValue", response.data.result);
			reset();
			setPhoneNumber("");
			setLoading(false);
			handleClose(true)
			getAdmin()
			toast.success(`New Admin has added successfully`);


		} catch (err) {
			console.error(err)
			if (err.response.data.isError) {
        toast.error(err.response.data.error.detail);
      }

		}
	}

	const getAdmin = async () => {
		try {
			const response = await axiosPrivate.get("https://tax.api.cyberozunu.com/api/v1.1/Authentication/get-admin-user");
			setTableData(response.data?.result);
			
		}
		catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAdmin();
	}, [])

	return (
		<div className='EditPackage'>
			<ToastContainer />
			<Container component="main" maxWidth="lg">
				<div className="back-button" onClick={() => navigate(-1)}>
					<ArrowBackIosNewIcon className="back-icon" />
					<h5 className="title is-5">Back</h5>
				</div>
				<Box

					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "left",
						width: "100%",
					}}
				>

					<Paper sx={{ width: "100%", overflow: "hidden" }}>
						<div className="header-button">
							<div>
								<h3 className='title is-5'>
									<IconButton onClick={handleClickOpen} color='primary' aria-label="addUser">
										<PersonAddIcon />
									</IconButton>
									Add User
								</h3>
							</div>
						</div>
						<div
							className sx={{ width: "100%", overflow: "hidden" }}>
							<UserListTable tableData={tableData} />
						</div>
					</Paper>
				</Box>
			</Container>

			<Dialog open={open} onClose={handleClose}>
				<form 
				onSubmit={handleSubmit(onSubmit)}
				>
					<DialogTitle>Add New User</DialogTitle>
					<DialogContent  >
						<Box sx={{ mt: 1 }}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoFocus
										name="firstName"
										required
										fullWidth
										id="firstName"
										label="First Name"
										{...register("firstName")}
									/>
									<Typography variant="body2" color="error" align="left">
                      {errors.firstName?.message}
                    </Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoFocus
										name="lastName"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										{...register("lastName")}
									/>
									<Typography variant="body2" color="error" align="left">
                      {errors.lastName?.message}
                    </Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoFocus
										name="email"
										type="email"
										required
										fullWidth
										id="email"
										label="Email Address"
										{...register("email")}

									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										autoFocus
										name="userName"
										required
										fullWidth
										id="userName"
										label="User Name"
										{...register("userName")}
									/>
									<Typography variant="body2" color="error" align="left">
                      {errors.userName?.message}
                    </Typography>
								</Grid>
								<Grid item xs={12} sm={6}>

									<FormControl sx={{ width: "30ch" }} variant="outlined">
										<InputLabel htmlFor="outlined-adornment-password">
											Password
										</InputLabel>
										<OutlinedInput
											id="password"
											fullWidth
											type={showPassword ? "text" : "password"}
											name={"password"}
											{...register("password")}

											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														edge="end"
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											label="Password"
										/>
									</FormControl>
									<Typography variant="body2" color="error" align="left">
										{errors.password?.message}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl sx={{ width: "30ch" }} variant="outlined">
										<InputLabel htmlFor="confirmPassword">
											Confirm Password
										</InputLabel>
										<OutlinedInput
											id="confirmPassword"
											{...register("confirmPassword")}

											type={showConfirmPassword ? "text" : "password"}
											name={"confirmPassword"}
											fullWidth
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowConfirmPassword}
														edge="end"
													>
														{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											label="Confirm Password"
										/>
									</FormControl>
									<Typography variant="body2" color="error" align="left">
										{errors.confirmPassword?.message}
									</Typography>

								</Grid>
								<Grid item xs={12} sm={7}>
									<PhoneInput
										id="phone"
										name="phone"
										country={"lk"}
										value={phoneNumber}
										onlyCountries={["gb", "lk"]}
										onChange={(phone) => {
											setPhoneNumber(phone);
											setValue("phone", phone);
											trigger("phone");
											setformInputData({ ...formInputData, "phonenumber": phone })
										}}
										specialLabel={"Phone Number"}
									/>
									<Typography variant="body2" color="error" align="left">
                      {errors.phone?.message}
                    </Typography>
								</Grid>
							</Grid>

						</Box>

					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<button
					  disabled={loading}
						className="button is-medium is-warning">Submit</button>
					</DialogActions>
				</form>

			</Dialog>

		</div>



	);

}