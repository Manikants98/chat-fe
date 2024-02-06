import { ButtonProps, DividerProps, Button as MuiButton, Divider as MuiDivider, Paper, PaperProps, TextField, TextFieldProps } from "@mui/material";

export const Button: React.FC<ButtonProps> = ({ children, variant = "contained", ...props }) => {
    return <MuiButton variant={variant} {...props} style={{ backgroundColor: "#121212" }}>{children}</MuiButton>;
};

export const Input: React.FC<TextFieldProps> = ({ ...props }) => {
    return <TextField {...props} />;
};

export const Divider: React.FC<DividerProps> = ({ ...props }) => {
    return <MuiDivider {...props} />;
};

export const Div: React.FC<PaperProps> = ({ ...props }) => {
    return <Paper {...props} />;
};




