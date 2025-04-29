import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users/' + params.id)
      .then(resp => resp.json())
      .then(data => setUser(data));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...user };

    // Ha jelszó nincs megadva, töröljük
    if (!dataToSend.password) {
      delete dataToSend.password;
      delete dataToSend.password_confirmation;
    }

    fetch('/api/users/' + params.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(async resp => {
        if (!resp.ok) {
          const err = await resp.json();
          setErrors(err.errors || {});
        } else {
          const res = await resp.json();
          console.log(res.message);
          navigate('/', { replace: true, state: { message: 'Sikeres mentés!' } });
        }
      })
      .catch(err => {
        console.error("Mentési hiba:", err);
      });
  };

  if (user === null) {
    return <div className="text-center my-5">Betöltés...</div>;
  }

  return (
    <form className="row col-md-6 col-lg-4 mx-auto my-5 g-3" onSubmit={handleSubmit}>
      <h3 className="text-center col-12">Felhasználó szerkesztése</h3>

      <div className="col-12">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Név"
          value={user.name}
          onChange={handleChange}
        />
        {errors.name && <small className="text-danger">{errors.name[0]}</small>}
      </div>

      <div className="col-12">
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email[0]}</small>}
      </div>

      <div className="col-12">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Új jelszó (opcionális)"
          onChange={handleChange}
        />
        {errors.password && <small className="text-danger">{errors.password[0]}</small>}
      </div>

      <div className="col-12">
        <input
          type="password"
          name="password_confirmation"
          className="form-control"
          placeholder="Jelszó ismét"
          onChange={handleChange}
        />
      </div>

      <div className="col-12 text-center">
        <button type="submit" className="btn btn-primary">Mentés</button>
      </div>
    </form>
  );
};

export default UserEdit;
