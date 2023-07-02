import {Formik} from 'formik';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Collapse, FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {getBrands, getProducts} from "../api-calls/ShoeDogApi";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {addReview} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";


const AddReviewComponent = () => {
    const [resp, setResp] = useState(undefined);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState(undefined);
    const [product, setProduct] = useState(undefined);
    const [rating, setRating] = useState(undefined);
    const [errors_review_content, setErrors_review_content] = useState(undefined);
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();


    useEffect(() => {
        if(user.role && user.role !== "") {
            getBrands(token.value).then((response) => {
                    setBrands(response.data);
                }
            ).catch((error) => {
                console.log(error);
            });
        } else {
            navigate("/login");
        }

    }, []);

    const handleSelectBrandChange = (e) => {
        let id = e.target.value;
        setBrand(e.target.value);
        getProducts(id, token.value).then((response) => {
            setProducts(response.data);
        })
            .catch((error) => {
                console.log(error);
            })


    };



    return (
        <div>
            <h1>Submit a Review!</h1>
            <Formik
                initialValues={{brand:"", product:"", rating:"", review_content: '', purchase_place: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    if (values.review_content.length < 20) {
                        setErrors_review_content("Add a proper review, please...");
                        setOpen(true);
                    } else {
                    console.log(values);
                    setTimeout(() => {
                        values.rating = rating;
                        values.product = product;
                        values.brand = brand;
                        setSubmitting(false);

                        addReview(values, user.email, token.value).then( (response) => {
                            console.log(response);

                        })

                            .catch( (error) => {
                                console.log(error);
                                setResp("Failed to add Review...");

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
                                        onChange={(event) => handleSelectBrandChange(event)}>
                                    {brands.map((brand) => (
                                        <MenuItem value={brand.id} id={brand.id}>{brand.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 200 }} >

                                <InputLabel id="simple-select-label">Select a product...</InputLabel>

                                <Select required id="product" labelId="simple-select-label" label="Select a product..."
                                        onChange={(event) => setProduct(event.target.value)}>
                                    {products.map((product) => (
                                        <MenuItem value={product.id} id={product.id}>{product.model}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 300 }} >
                                <TextField required
                                           onChange={handleChange("review_content")}
                                           id="review_content"
                                           value={values.review_content}
                                           label="What do you think about this pair?"
                                           multiline={true}
                                           minRows={3}
                                           maxRows={10}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 300 }} >
                                <TextField required
                                           onChange={handleChange("purchase_place")}
                                           value={values.purchase_place}
                                           id="purchase_place" label="Where did you get it?"/>
                            </FormControl>
                        </div>
                        <div>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">Rate this pair</Typography>
                                <Rating
                                    name="simple-controlled"
                                    precision={0.5}
                                    onChange={(event) => setRating(event.target.value)}
                                    id="rating"
                                />
                            </Box>
                        </div>

                        <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={open}>
                                <Alert severity="error"
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
                                >{errors_review_content}</Alert>
                            </Collapse>
                        </Box>

                    </form>



                )}

            </Formik>

        </div>
    );

};

export default AddReviewComponent;