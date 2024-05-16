import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import styled from "@emotion/styled";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.account);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        dispatch(signOut());
        navigate('/');
    }


    return (
        <>
            <SettingsIcon className="rotate-hover" onClick={handleClick} />
            <Menu
                className="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem sx={{paddingRight: '40px', fontSize: '19px', color: '#444444', borderRadius: '4px'}} onClick={handleClose}>Profile</MenuItem>
                <MenuItem sx={{paddingRight: '40px', fontSize: '19px', color: '#444444', borderRadius: '4px'}} onClick={handleClose}>My account</MenuItem>
                <MenuItem sx={{paddingRight: '40px', fontSize: '19px', color: '#444444', borderRadius: '4px'}} onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </>
    );
}
