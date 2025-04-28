import React from 'react';
import { useParams } from 'react-router-dom';
import{useState, useEffect} from 'react';

const UserEdit = () => {

    const [user, setUser] = useState(null)

    const params = useParams()

    useEffect(()=>{
        fetch('/api/users/'+params.id)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
                setUser(resp);
            })
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        fetch('/api/users/'+params.id, {
            method: 'POST',
            headers: {
                'Conent-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            })
    }

    const handleChange = e =>{
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (

        <>
        {user === null ? 'loading' : <form className='row col-md-6 col-lg-4 mx-auto my-5 g-3' onSubmit={handleSubmit}>

            <h3 className='text-center col-12'>{user.name} Adatai</h3>

            <div className="col-12">
                <input type="text" name='name' className="form-control" placeholder='Név' value={user.name} onChange={handleChange}/>
            </div>

            <div className="col-12">
                <input type="text" name='email' className="form-control" placeholder='Email' value={user.email} onChange={handleChange}/>
            </div>

            <div className="col-12">
                <input type="text" name='password' className="form-control" placeholder='Jelszó' onChange={handleChange}/>
            </div>

            <div className="col-12">
                <input type="text" name='password_confirmation' className="form-control" placeholder='Jelszó ismét' onChange={handleChange}/>
            </div>
            
            <div className="col-12 text-center">
                <button className='btn btn-primary'>Mentés</button>
            </div>
        </form>}
        </>
    );
}

export default UserEdit;
