import React from 'react';
import ReactDOM from 'react-dom';
import{useState, useEffect} from 'react';
import { line } from 'laravel-mix/src/Log';
import {Link} from 'react-router-dom';

function Users(){
    const [users, setUsers] = useState([])

     useEffect(()=>{
        fetch( config.users.url )
            .then(res=>res.json())
            .then( res=>{
                setUsers(res)
            }
                
            )
    }, [])

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
                                return <tr key={index}>
                                    <td>
                                       {user.name} 
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.username} 
                                    </td>
                                    <td>
                                        <Link to={"/users/" + user.id} className="btn btn-success btn-sm">Módosítás</Link>
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

export default Users;

// if (document.getElementById('user')) {
//     ReactDOM.render(<Users />, document.getElementById('user'));
// }