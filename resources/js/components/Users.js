import React from 'react';
import ReactDOM from 'react-dom';
import{useState, useEffect} from 'react';
import { line } from 'laravel-mix/src/Log';
import {Link} from 'react-router-dom';

function Users(){
    const [users, setUsers] = useState([])
    const [links, setLinks] = useState([])
    const [url, setUrl] = useState(config.users_url)

     useEffect(()=>{
        fetch( url )
            .then(res=>res.json())
            .then( list=>{
                setUsers(list.data);
                setLinks(list.links)
            }
                
            )
    }, [url])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Felhasználók</div>
                            <p className="text-center">{url}</p>
                        <div className="card-body">
                            <table className="table table-striped">
                            <tbody>
                            {users !==  null ? users.map((item, index) => <tr key={index}>

                                <td>{item.id}</td>
                                <td><Link to={'/users' + item.id}>{item.name}</Link></td>
                                <td>{item.emial}</td>
                                <td>
                                    <a href="" className='btn btn-danger btn-sm m-1'>Törlés</a>
                                    <a href="" className='btn btn-primary btn-sm m-1'>Módosítás</a>
                                </td>

                            </tr> ) : <tr>
                                <td>
                                    <h4>Loading...</h4>
                                </td>

                            </tr>}
                            </tbody>
                            </table>

                            <p className='text-center'>
                                {links !== null && links.map( (link, index) =>{
                                    return <a href={link.url} onClick={ function(e){
                                        e.preventDefault()
                                        setUrl(link.url)
                                    }} className='btn btn-outline-primary' dangerouslySetInnerHTML={{__html: link.label}}/>
                                })}
                            </p>
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