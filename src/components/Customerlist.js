import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { CircularProgress } from '@material-ui/core';

import Addcustomer from'./Addcustomer';
import Deletecustomer from './Deletecustomer';
import Editcustomer from'./Editcustomer';
import Deletetraining from './Deletetraining';
import Addtraining from './Addtraining';



const icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Customerlist = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'firstname',
            field: 'firstname'
        },
        {
            title: 'lastname',
            field: 'lastname'
        },
        {
            title: 'address',
            field: 'streetaddress'
        },
        {
            title: 'postcode',
            field: 'postcode'
        },
        {
            title: 'city',
            field: 'city'
        },
        {
            title: 'email',
            field: 'email'
        },
        {
            title: 'phone',
            field: 'phone',
            cellStyle: {
                width: '15%'
            }
        },
        {
            title: 'trainings',
            field: 'trainings',
            sorting: false,
            cellStyle: {
                width: '20%'
            },
            render: customer => (customer.trainings || []).map((training, index) => {
                if (!training.hasOwnProperty('date')) {
                    return null
                }
                return (
                    <p key={index}>
                        Date: {new Date(training.date).toLocaleString('en-GB', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        })} <br />
                        Duration: {training.duration} <br />
                        Activity: {training.activity} <br />
                        <Deletetraining fetchCustomers={fetchCustomers} training={training}/>
            
                    </p>
                )
            }
            )
        },
        {   
            title: 'Add training',
            sorting: false,
            render: customer => <Addtraining fetchCustomers={fetchCustomers} customer={customer}/>
        },
        {
            title: 'Edit',
            sorting: false,
            render: customer => <Editcustomer fetchCustomers={fetchCustomers} customer={customer}/> 
        },
        {
            title:'Remove',
            sorting: false,
            render: customer => <Deletecustomer fetchCustomers={fetchCustomers} customer={customer} />
        }
    ];

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        setLoading(true)
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            const customers = responseData.content
            const customerTrainingPromises = customers.map((customer, index) => {
                const link = customer.links.find(l => l.rel === 'trainings').href
                return fetch(link)
                    .then(response => response.json())
                    .then(responseData => {
                        customers[index].trainings = responseData.content
                    })
            })
            Promise.all(customerTrainingPromises)
                .catch(err => console.error(err))
                .then(() => {
                    setCustomers(customers)
                    setLoading(false)
                })
        })
        .catch(err => console.error(err));
    }

    if (loading) {
        return <CircularProgress />
    } else {
        return (
            <div> 
                <MaterialTable 
                    columns={columns}
                    data={customers}
                    icons={icons}
                    title="Customers and trainings"
                />
                 
                <div>
                    <Addcustomer fetchCustomers={fetchCustomers} />
                </div>
            </div>
        )
    }
}
export default Customerlist;