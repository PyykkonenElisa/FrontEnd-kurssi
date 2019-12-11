import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Addtraining(props){
    const [training, setTraining] = useState(
        {
            date: new Date(), activity: '', duration: '', 
            customer: props.customer.links.find(l => l.rel === 'self').href
        })
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(new Date())

    useEffect(() => {
        const trainingDate = new Date(
            selectedDate.getFullYear(), 
            selectedDate.getMonth(), 
            selectedDate.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes(),
            selectedTime.getSeconds(),
            0).toISOString()
        setTraining({...training,date: trainingDate})
    }, [selectedDate, selectedTime])

    const handleChange = (event) => {
        setTraining({...training,[event.target.id]: event.target.value})
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .catch(err => console.error(err))
        .then(res => props.fetchCustomers())
    }
    
    const handleSave = () => {
        saveTraining()
        setOpen(false)
    }


    const handleDateChange = date => {
        setSelectedDate(date)
    };

    const handleTimeChange = time => {
        setSelectedTime(time)
    }
    /* date picker? https://material-ui.com/components/pickers/ */
   
    return ( 
       <>
            <AddIcon onClick={handleClickOpen} />
           <div>
           <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new training</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Remember to fill all fields :)
                        </DialogContentText>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Pick a date"
                            format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Pick a time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            margin="dense"
                            id="activity"
                            value={training.activity}
                            label="activity"
                            onChange={e=> handleChange(e)}
                            fullWidth
                        />   
                        <TextField
                            margin="dense"
                            id="duration"
                            type="number"
                            value={training.duration}
                            label="duration"
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
