import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "rgb(88,199,250)"
        },
        secondary: {
            main: "#5A20CB"
        },
        background: {
            default: "#ffffff",
            paper: "#f5f5f5"
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "rgb(88,199,250)"
        },
        secondary: {
            main: "#5A20CB"
        },
        background: {
            default: "#212534",
            paper: "#212534"
        }
    }
});