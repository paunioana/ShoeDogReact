import {Formik} from 'formik';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Collapse, FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {addProduct, getBrands, getProducts} from "../api-calls/ShoeDogApi";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";


const AddProductComponent = () => {
    const [resp, setResp] = useState(undefined);
    const [brands, setBrands] = useState([]);
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState(undefined);
    const [year, setYear] = useState((new Date()).getFullYear());
    const [severity, setSeverity] = useState("error");
    const years = Array.from(new Array(5),( val, index) => year - index);
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const isUser = useSelector(state => (state.user.role ==="ADMIN" || state.user.role === "USER"));
    const navigate = useNavigate();


    useEffect(() => {

        if(isUser) {
            getBrands(token.value).then((response) => {
                    setBrands(response.data);
                }
            ).catch((error) => {
                console.log(error);
            });
        } else {
            navigate("/reviews");
        }

    }, [user]);




    return (
        <div>
            <h1>Add a missing Product!</h1>
            <Formik
                initialValues={{brand:"", model:"", year:""}}
                onSubmit={(values, { setSubmitting }) => {
                    if (values.model.length < 5) {
                        setResp("Add a proper name, please...");
                        setSeverity("error");
                        setOpen(true);
                    } else {
                        console.log(values);
                        setTimeout(() => {
                            values.year = year;
                            values.brand = brand;
                            setSubmitting(false);
                            addProduct(values, user.role, token.value).then( (response) => {
                                setResp(response.data);
                                setSeverity("success");
                                setOpen(true);

                            })
                                .catch( (error) => {
                                    console.log(error);
                                    setResp("Failed to add Product. Check if product already exists!");
                                    setSeverity("warning");
                                    setOpen(true);

                                });


                        }, 400);
                    }
                }}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 200 }} >

                                <InputLabel id="simple-select-label">Select a brand...</InputLabel>

                                <Select required id="brand"
                                        labelId="simple-select-label"
                                        label="Select a brand..."
                                        onChange={(event) => setBrand(event.target.value)}>
                                    {brands.map((brand) => (
                                        <MenuItem value={brand.id} id={brand.id}>{brand.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 200 }} >
                                <TextField required
                                           onChange={handleChange("model")}
                                           id="model"
                                           value={values.model}
                                           label="Model Name"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 210 }} >

                                <InputLabel id="simple-select-label">Select a year...</InputLabel>

                                <Select required id="year"
                                        labelId="simple-select-label"
                                        label="Select a year..."
                                        onChange={(e) => setYear(e.target.value)}>
                                    {years.map((year) => (
                                        <MenuItem value={year} id={year}>{year}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>


                        <Button variant="contained" color="secondary" type="submit" disabled={open}>
                            Submit
                        </Button>
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={open}>
                                <Alert severity={severity}
                                       action={
                                           <IconButton
                                               aria-label="close"
                                               color="inherit"
                                               size="small"
                                               onClick={() => {
                                                   setOpen(false);
                                               }}
                                           >
                                               <CloseIcon fontSize="inherit" />
                                           </IconButton>
                                       }
                                       sx={{ mb: 2 }}
                                >{resp}</Alert>
                            </Collapse>
                        </Box>

                    </form>
                    )}

            </Formik>

        </div>
    );

};

export default AddProductComponent;