import React, { useState, useEffect, useContext } from "react";
import "./dashboard.css"; // Import the CSS file
import axios from "../../connector";
import { CurrentUserContext } from "../../index";
import Header from "../header";
import UserForm from "./form";
import CustomDrawer from "../../components/drawer";

const Dashboard = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    // const response = await axios.get("/dashboard");
    // const data = response.data;
    // setDashboardData(data.payload?.books);
    // setLoading(false);
  };

  return (
    <>
      <Header />
      <Table data={dashboardData} setRefresh={setRefresh} refresh={refresh} />
    </>
  );
};

export default Dashboard;

const Table = (props) => {
  const { data = [], refresh, setRefresh } = props;
  const [editItem, setEditItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  const onEdit = (item) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };
  const addForm = () => {
    setIsNewFormOpen(true);
  };
  const onEditClose = () => {
    setIsDrawerOpen(false);
  };
  const onClose = () => {
    setIsNewFormOpen(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Books List</h1>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            margin: 20,
            padding: "10px 20px",
          }}
          onClick={() => addForm()}
        >
          New
        </button>
      </div>

      <table border={1} className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Title</th>
            <th>Author Name</th>
            <th>Genre</th>
            <th>Publication Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.authorName}</td>
              <td>{item.genre}</td>
              <td>{item.publicationYear}</td>
              <td>
                <button onClick={() => onEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDrawerOpen && (
        <CustomDrawer
          visible={isDrawerOpen}
          onClose={onEditClose}
          title={`Edit ${editItem.title}`}
        >
          <UserForm
            data={editItem}
            setIsDrawerOpen={setIsDrawerOpen}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </CustomDrawer>
      )}
      {isNewFormOpen && (
        <CustomDrawer
          visible={isNewFormOpen}
          onClose={onClose}
          title="Add Book"
        >
          <UserForm
            setIsNewFormOpen={setIsNewFormOpen}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </CustomDrawer>
      )}
    </>
  );
};
