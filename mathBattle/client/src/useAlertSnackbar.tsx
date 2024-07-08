import { useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

export function useAlertSnackbar() : [(msg: string, severity:AlertColor) => void, () => JSX.Element, () => void] {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor | undefined>("success");
    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    const display = (message: string, severity: AlertColor) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    }
    const AlertSnackbar = function () {
        return (
            <Snackbar 
            open={open} 
            autoHideDuration={2000} 
            onClose={handleClose}
            anchorOrigin={{vertical:"top", horizontal:"center"}}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%", mt:5}}>
                    {message}
                </Alert>
            </Snackbar>
        );
    };
    return [
        display,
        AlertSnackbar,
        handleClose
    ];
}