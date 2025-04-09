import React from 'react';
import ReactDOM from 'react-dom';
import{useState, useEffect} from 'react';
import { toFormData } from 'axios';

function Example() {

    const[users, setUsers] =useState([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then( res=>{
            setUsers(res)
        }
            
        )
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Felhasználók</div>

                        <div className="card-body">
                            <table className="table table-striped">
                            <tbody>
                            {users.map( function(user, index) {
                                return <tr>
                                    <td>
                                       {user.name} 
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.phone}
                                    </td>
                                </tr>
                            })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
