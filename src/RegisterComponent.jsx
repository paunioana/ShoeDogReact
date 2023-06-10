import {Box, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";

const RegisterComponent = () => {
    const [resp, setResp] = useState(undefined);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = () => {
        axios.post('http://localhost:8083/user/register', {
            "email": email,
            "role": "USER",
            "password": password
        }).then( (response) => {
            setResp(response.data);
        })
            .catch( (error) => {
                console.log(error);
                setResp("Failed to register! Please try again...");

            });
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </Box>
            <div>
                <button type="button" onClick={registerUser}>Register</button>
            </div>
            {resp != undefined && <div>{resp}</div>}
        </div>
    );

};

export default RegisterComponent;