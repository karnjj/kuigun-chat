import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Head from 'next/head';


export default function LogIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [nickName, setNickName] = React.useState("");
  const handleChange = event => {
    setNickName(event.target.value);
  };

  return (
    <>
        <Stack sx={{ flex: 1 }} spacing={2} direction="column" justifyContent="center" alignItems="center">
            
            <Typography component="h1" variant="h5" >
            Nickname
            </Typography>
            <form>
            <TextField
                onChange={handleChange}
                required
                hiddenLabel
                fullWidth
                id="nickname"
                value={nickName}
                variant="outlined"
                autoFocus
                sx={{background: 'white'}}
                InputLabelProps={{disableAnimation: true, style:{color: 'gray', }, shrink:false}}
                label={nickName=== "" ? "Fill your nickname": ""}
                InputProps={{sx:{
                  "& input": {
                    textAlign: "center"
                }
                }}}
                        
                
            />
            
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor: 'primary.main'}}
            >
                Join
            </Button>
            </form>
        </Stack>
       
      
      </>
  );
}
