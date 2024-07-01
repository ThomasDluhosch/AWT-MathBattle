import { useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

export function useAlertSnackbar() : [(msg: string, severity:AlertColor) => void, () => JSX.Element] {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor | undefined>("success");
    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

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
            autoHideDuration={5000} 
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
        AlertSnackbar
    ];
}