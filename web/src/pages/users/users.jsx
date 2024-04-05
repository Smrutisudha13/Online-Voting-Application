import React, { useState, useEffect } from 'react';
import './users.css'; 
import axios from "axios";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/sample/get");
      const { status, cls, msg, payload } = data;
      setLoading(false);

      setUsers(payload.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName} {user.middleName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>{user.email}</td>
              <td>{user.mobilenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
