import React, {useState, useEffect, useContext} from "react";
import {Backdrop, Box, Button, Fade, FormControl, makeStyles, Modal, Typography} from "@mui/material";
import RegistrationForm from "../../components/RegistrationForm";
import {Context} from "../../index";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
export const AddUserModalWindow = () => {
	const {store} = useContext(Context)
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>Добавить пользователя</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Добавить пользователя
					</Typography>
					<RegistrationForm handleClose={handleClose}/>
				</Box>
			</Modal>
		</div>
	);
};
