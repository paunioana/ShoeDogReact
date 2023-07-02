import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../api-calls/ShoeDogApi";

const RegisterComponent = () => {
    const [resp, setResp] = useState(undefined);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigation = useNavigate();

    const registerUser = () => {
        register(email, password, firstName, lastName).then( (response) => {
            setResp(response.data);
            setTimeout(() =>
                navigation("/login"), 2000);
        })

            .catch( (error) => {
                console.log(error);
                setResp(error.response.data);

            });
    };
    const handlePasswordValidation = (e) =>{
        let aux = e.target.value;
        let errMsg = "";
        console.log(aux);
        const uppercaseRegExp = new RegExp(/(?=[A-Z])/);
        const lowercaseRegExp = new RegExp(/(?=.*?[a-z])/);
        const digitsRegExp = new RegExp(/(?=.*?[0-9])/);
        const specialCharRegExp = new RegExp(/(?=.*?[~!@#$%^&*(){}:">])/);

        const uppercasePassword = uppercaseRegExp.test(aux);
        const lowercasePassword = lowercaseRegExp.test(aux);
        const digitsPassword = digitsRegExp.test(aux);
        const specialCharPassword = specialCharRegExp.test(aux);
        const minLengthPassword = aux.length >= 8;

        if (aux.length === 0) {
            errMsg = "Password is empty";
        } else if (!uppercasePassword) {
            errMsg = "At least one Uppercase";
        } else if (!lowercasePassword) {
            errMsg = "At least one Lowercase";
        } else if (!digitsPassword) {
            errMsg = "At least one digit";
        } else if (!specialCharPassword) {
            errMsg = "At least one Special Characters";
        } else if (!minLengthPassword) {
            errMsg = "At least minimum 8 characters";
        }

        if(errMsg === "") {
            setPassword(aux);
        }
        setPasswordError(errMsg);

    }
    const handleConfirmPasswordValidation = (e) =>{
        let aux = e.target.value;
        console.log(confirmPassword);
        if(aux !== password) {
            setConfirmPasswordError("passwords don't match!");
        } else {
            setConfirmPassword(aux);
            setConfirmPasswordError("");
        }

    }

    let handleEmailValidation = (e) => {
        let email = e.target.value;
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email) ) {
            setEmail(email);
            setEmailError("");
        }
        else {
            setEmailError("Please enter a valid e-mail address.");
        }

    }

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
                        id="firstname-required"
                        label="first name"
                        type="name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="lastname-required"
                        label="last name"
                        type="name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="email"
                        type="email"
                        onChange={(e) => handleEmailValidation(e)}
                    />
                    {emailError !== "" && <p>{emailError}</p>}
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="password"
                        type="password"
                        onChange={(event) => handlePasswordValidation(event)}
                    />
                    {passwordError !== "" && <p>{passwordError}</p>}
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="confirm password"
                        type="password"
                        onChange={(e) => handleConfirmPasswordValidation(e)}
                    />
                    {confirmPasswordError !== "" && <p>{confirmPasswordError}</p>}
                </div>
            </Box>

            <div>
                {emailError === "" && passwordError === "" && confirmPasswordError === "" && firstName !== "" && lastName !== "" && password !== "" && confirmPassword !== "" && <Button variant="contained" type="button" onClick={registerUser}>Register</Button>}
            </div>
            {resp !== undefined && <div>{resp}</div>}
        </div>
    );

};

export default RegisterComponent;