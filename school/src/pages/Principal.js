import React, { useState } from "react";
import { getAllStudentsAndTeachers } from "../services/api-services"; // You need to create this API function
import "../style.css";

const Principal = (props) => {
  const [data, setData] = useState(null);

  const fetchPrincipalData = async () => {
    try {
      const response = await getAllStudentsAndTeachers(props?.userData?.id);
      console.log("Response:", response);
      setData(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="principal-container">
      <h2 className="principal-title">Principal Dashboard</h2>
          {!data && <button onClick={fetchPrincipalData} className="principal-button">
              Get All Teachers & Students Information
          </button>}
{data && (
  <div className="principal-result">
    {/* Teachers Section */}
    <div >
      <h3>Teachers</h3>
      {data.teachers && data.teachers.length > 0 ? (
        <ul className="list">
          {data.teachers.map((teacher, index) => (
            <li key={index} className="list-item">
              <strong>Name:</strong> {teacher.name} <br />
              <strong>Email:</strong> {teacher.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No teachers found</p>
      )}
    </div>

    {/* Students Section */}
    <div>
      <h3>Students</h3>
      {data.students && data.students.length > 0 ? (
        <ul className="list">
          {data.students.map((student, index) => (
            <li key={index} className="list-item">
              <strong>Name:</strong> {student.name} <br />
              <strong>Email:</strong> {student.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found</p>
      )}
    </div>
  </div>
)}

     
    </div>
  );
};

export default Principal;
