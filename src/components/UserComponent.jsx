import '../css/UserComponent.css';
import {useEffect, useState} from "react";
import {getUserDetails, updateUser} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";
import profile from '../resources/shoeDog.png';
import {useNavigate} from "react-router-dom";
import {Box, Button, Fab, TextField} from "@mui/material";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import PostsComponent from "./PostsComponent";
const UserComponent = () => {
    const [userDetails, setUserDetails] = useState({});
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const [edit, setEdit] = useState(false);
    const [profileButton, setProfileButton] = useState(false);
    const [fn, setFn] = useState("");
    const [ln, setLn] = useState("");
    const [about, setAbout] = useState("");
    const [resp, setResp] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if(user.role && user.role !== "") {
            getUserDetails(user.email, token.value)
                .then((response) => {
                    setUserDetails(response.data);
                    setLn(response.data.lastName);
                    setFn(response.data.firstName);
                    setAbout(response.data.about);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }

    }, []);

const openEdit = () => {
    setEdit(true);
    setProfileButton(true);

}

const submitDetails = () => {
if(fn!=="" && ln!=="" && about!==""){
    updateUser(userDetails.email,fn, ln, about, token.value).then((response) => {
        setEdit(false);
        setProfileButton(false);
        getUserDetails(user.email, token.value)
            .then((response) => {
                setUserDetails(response.data);
                setLn(response.data.lastName);
                setFn(response.data.firstName);
                setAbout(response.data.about);
            })
            .catch((error) => {
                console.log(error);
            });

    })
        .catch((error) => {
            console.log(error);
        })
}
}

const cancel = () =>{
    setEdit(false);
    setProfileButton(false);
}
    return (
        <div className="container">
            <div>
                <Box className="profile-card" sx={{
                width: 300,
                height: 500,
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
                        <div className="card-title">
                            {userDetails.firstName + " " + userDetails.lastName}
                        </div>
                        <div className="card-email">{userDetails.email}</div>

                            <div className="card-text">{userDetails.about}</div>


                            <div className="card-text">{userDetails.no_reviews + " reviews added"}</div>
                            <Fab id="edit-profile" variant="extended" size="small" color="secondary" disabled={profileButton} onClick={() => openEdit()}>
                                <SettingsSuggestRoundedIcon sx={{ mr: 1 }} />
                                Edit Profile
                            </Fab>

                    </div>
                </div>
            </Box>
            </div>
            {edit && (<div>
            <Box
                className="edit-box" sx={{
                width: 600,
                height: 600,
                margin: 20}}
                noValidate
                autoComplete="off"

            >
                <TextField
                    required
                    id="outlined-required"
                           variant="filled"
                    label="First Name"
                    defaultValue={userDetails.firstName}
                    onChange={(event) => setFn(event.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                           variant="filled"
                    defaultValue={userDetails.lastName}
                    onChange={(event) => setLn(event.target.value)}
                />
                <TextField
                    id="outlined-read-only-input"
                    label="email"
                           variant="standard"
                    defaultValue={userDetails.email}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Tell us more about yourself"
                    variant="filled"
                    multiline={true}
                    minRows={3}
                    maxRows={5}
                    defaultValue={userDetails.about}
                    onChange={(event) => setAbout(event.target.value)}
                />
            <div id="submit-details">
                <Button variant="contained" color="primary" type="submit" onClick={() => submitDetails()}>Submit</Button>
                <Button variant="outlined" color="primary" onClick={() => cancel()}>Cancel</Button>
            </div>
            </Box>
            </div>) }

        </div>

    );
}
export default UserComponent;