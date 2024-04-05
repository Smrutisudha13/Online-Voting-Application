import React, { useState } from "react";
import axios from "../../connector";

const UserForm = (props) => {
  const { data, refresh, setRefresh } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    data?._id
      ? data
      : {
          _id: "new",
          title: "",
          authorName: "",
          genre: "",
          publicationYear: "",
        }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await axios.post("/save/book", formData);
    const data = await response.data;
    const { status } = data;
    setLoading(false);
    if (status) {
      setRefresh(refresh + 1);
    }
    if (props?.setIsNewFormOpen) {
      props?.setIsNewFormOpen(false);
    }
    if (props?.setIsDrawerOpen) {
      props?.setIsDrawerOpen(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </label>
        <br />
        <br />
        <label>
          Author Name:
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </label>
        <br />
        <br />
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </label>
        <br />
        <br />
        <label>
          Publication Year:
          <input
            type="text"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          loading={loading}
          style={{
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UserForm;
