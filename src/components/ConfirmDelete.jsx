import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";


function ConfirmDelete({ open, onClose, onConfirm, userName }) {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>
                    <Typography>Deseja mesmo excluir o usuario:</Typography>
                    <p>{userName}</p>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm}>Excluir</Button>
                </DialogActions>
        </Dialog>
    )
}

export default ConfirmDelete;
