import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Deletecustomer(props){
    
    const handleDelete = () => {
        const deleteLink = props.customer.links.find(l => l.rel === 'self').href
        
        if (window.confirm('Are you sure')){
            fetch(deleteLink, {method:'DELETE'})
            .then(res => props.fetchCustomers())
            .catch(err => console.error(err))
        }
    }

    return ( 
    <DeleteIcon onClick={handleDelete} />
    )
}
