import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState("http://127.0.0.1:8000/api/users");

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Hiba a szervertől: " + res.status);
        }
        return res.json();
      })
      .then(data => {
        setUsers(data);  // közvetlenül a tömbre állítunk
      })
      .catch(err => {
        console.error("Fetch hiba:", err.message);
      });
  }, [url]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">Felhasználók</div>
        <p className="text-center">{url}</p>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Email</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td><Link to={`/users/${item.id}`}>{item.name}</Link></td>
                    <td>{item.email}</td>
                    <td>
                      <button className="btn btn-danger btn-sm m-1">Törlés</button>
                      <button className="btn btn-primary btn-sm m-1">Módosítás</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Betöltés...
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Users;
