import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';


export default function Deletetraining(props){

    const handleDelete = () => {
      const deleteLink = props.training.links.find(l => l.rel === 'self').href
        
        if (window.confirm('Are you sure')){
            fetch(deleteLink, {method:'DELETE'})
            .then(res => props.fetchCustomers())
            .catch(err => console.error(err))
        }
    }

    return(<ClearIcon onClick={handleDelete}/>)
}