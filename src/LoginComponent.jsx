import {Box, TextField} from "@mui/material";

const LoginComponent = () => {
    return (
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
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="password"
                />
            </div>
        </Box>
    );

};

export default LoginComponent;