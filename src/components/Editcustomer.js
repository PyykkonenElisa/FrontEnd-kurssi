import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export default function Deletecustomer(props){
    const [customer, setCustomer] = useState(
        {firstname: '', lastname: '', streetaddress:'', postcode:'', city:'', email:'', phone:''})
    const [open, setOpen] = useState(false);


    const handleChange = (event) => {
        setCustomer({...customer,[event.target.id]: event.target.value})
    };

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveCustomer = (newCustomer) => {
        const editLink = props.customer.links.find(l => l.rel === 'self').href
        fetch(editLink,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .catch(err => console.error(err))
        .then(res => props.fetchCustomers())
    }
    
    const handleSave = () => {
        saveCustomer(customer)
        setOpen(false)
    }

    return(
        <>
            <EditIcon onClick={handleClickOpen}/>
            
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Add new customer
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="firstname"
                        value={customer.firstname}
                        onChange={e=> handleChange(e)}
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        value={customer.lastname}
                        label="Surname"
                        onChange={e=> handleChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        value={customer.streetaddress}
                        label="Address"
                        onChange={e=> handleChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="postcode"
                        value={customer.postcode}
                        label="Postcode"
                        onChange={e=> handleChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        value={customer.city}
                        label="City"
                        onChange={e=> handleChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        value={customer.email}
                        label="Email Address"
                        onChange={e=> handleChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        value={customer.phone}
                        label="Phone number"
                        onChange={e=> handleChange(e)}
                        fullWidth
                    />        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} >
                            Cancel
                        </Button>
                        <Button onClick={handleSave} >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
        ) 
}
