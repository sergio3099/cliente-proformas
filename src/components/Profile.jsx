import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar'
import { Grid, Typography } from "@mui/material";


const Profile = () => {
    const {user, isAuthenticated} = useAuth0();
    return (
       isAuthenticated && (
        <div>
            <Grid container  direction="row" justifyContent="center" alignItems="center" >
            <Typography>Hola {user.name}</Typography>
            <Avatar alt={user.name} src={user.picture} sx={{width: 56, height: 56}}/>
            </Grid>
        </div>
       )
    )
}

export default Profile;