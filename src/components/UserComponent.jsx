import '../css/UserComponent.css';
import {useEffect, useState} from "react";
import {getUserDetails} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";
import profile from '../resources/shoeDog.png';
import {useNavigate} from "react-router-dom";
import {Box, Button, FormControl, TextField} from "@mui/material";
const UserComponent = () => {
    const [userDetails, setUserDetails] = useState({});
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        if(user.role && user.role !== "") {
            getUserDetails(user.email, token.value)
                .then((response) => {
                    console.log(response);
                    setUserDetails(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }

    }, []);


    return (
        <div className="container">
            <div>
                <Box className="profile-card" sx={{
                width: 300,
                height: 300,
                margin: 20}}>
                <div className="card">
                    <div className="card-body">
                        <div className="avatar">
                            <img
                                src={profile}
                                className="card-img-top"
                                alt=""
                            />
                        </div>
                        <h2 className="card-title">
                            {userDetails.firstName + " " + userDetails.lastName}
                        </h2>
                        <h3 className="card-text">
                            {userDetails.email}
                            <br />
                            {/*<span>{userDetails.about}</span>*/}
                            <br/>

                            {/*<span>{userDetails.no_reviews + " reviews added"}</span>*/}
                            <Button  variant="contained" color="secondary">Edit Profile</Button>
                        </h3>
                    </div>
                </div>
            </Box>
            </div>
            <div>
            <Box
                className="edit-box" sx={{
                width: 600,
                height: 600,
                margin: 20, '& .MuiTextField-root': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off"

            >
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue={userDetails.firstName}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue={userDetails.lastName}
                />
                <TextField
                    id="outlined-read-only-input"
                    label="email"
                    defaultValue={userDetails.email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <FormControl sx={{ m: 1, minWidth: 300 }} >
                <TextField
                    required
                    id="outlined-required"
                    label="Tell us more about yourself"
                    multiline={true}
                    minRows={3}
                    maxRows={5}
                />
                </FormControl>
            <div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </div>
            </Box>
            </div>


        </div>

    );
}
export default UserComponent;