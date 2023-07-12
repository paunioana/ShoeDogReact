import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../api-calls/ShoeDogApi";
import {addUserDetails} from "../actions/action";
import {useDispatch} from "react-redux";


const LoginComponent = () => {
    const [resp, setResp] = useState(undefined);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = () => {
        login(email, password).then( (response) => {
            let aux = JSON.parse(response.request.response);
            localStorage.setItem("role", aux.role);
            localStorage.setItem("token", aux.token);
            localStorage.setItem("email", aux.email);
            let jwtPayload = JSON.parse(window.atob(aux.token.split('.')[1]))
            localStorage.setItem("expiryDate",jwtPayload.exp);

            navigate("/profile");
            dispatch(addUserDetails(aux.token, jwtPayload.exp, aux.role, aux.email));
        })

            .catch( (error) => {
                console.log(error);
                setResp("Failed to login... Check email and password");

            });
    };


    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    marginTop: '30px'
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </Box>

            <div>
                <Button variant="contained" type="button" disabled={email==="" || password===""} onClick={loginUser}>Login</Button>
            </div>
            <div>
                <p>Don't have an account yet?</p>
                <div>
                    <Button variant="contained" type="button" onClick={() => navigate("/register")}>Register</Button>
                </div>
            </div>
            {resp !== undefined && <div>{resp}</div>}
        </div>
    );

};

export default LoginComponent;