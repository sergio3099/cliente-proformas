import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar'
import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// import LogoutButton from './LogoutButton'


const Profile = () => {
    const { user, isAuthenticated, logout } = useAuth0();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        isAuthenticated && (
            <div>
                {/* <Grid container  direction="row" justifyContent="center" alignItems="center" >
            <Typography>Hola {user.name}      </Typography>
            <Avatar alt={user.name} src={user.picture} sx={{width: 56, height: 56}}/>
        </Grid> */}


                <Box sx={{ flexGrow: 0 }}>

                    <Tooltip title="Open settings">
                        <Grid container direction="row" justifyContent="center" alignItems="center"  >
                            <Typography padding= "0 1rem" ><strong>Hola</strong> {user.name}      </Typography>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.nickname} src={user.picture} />
                            </IconButton>
                        </Grid>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >

                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={() => logout()} >Cerrar sesión</Typography>

                        </MenuItem>

                    </Menu>
                </Box>



            </div>
        )
    )
}

export default Profile;