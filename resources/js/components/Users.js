import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageClick = (pageNumber) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false);
    }, 300);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">Felhasználók</div>

        <div className="card-body">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{height: "200px"}}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Email</th>
                    <th className="text-end px-5">Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td><Link to={`/users/${item.id}`}>{item.name}</Link></td>
                        <td>{item.email}</td>
                        <td className="text-end">
                          <button className="btn btn-danger btn-sm m-1">Törlés</button>
                          <Link to={`/users/${item.id}/edit`} className="btn btn-primary btn-sm m-1">
  Módosítás
</Link>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Nincs adat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="d-flex justify-content-center mt-3 flex-wrap">
                <button
                  className="btn btn-outline-secondary m-1"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Előző
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`btn m-1 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="btn btn-outline-secondary m-1"
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                >
                  Következő
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
