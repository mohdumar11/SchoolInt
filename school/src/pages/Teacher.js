import React, { useState } from "react";
import { getStudentsByTeacherId } from "../services/api-services";
import "../style.css";

const Teacher = (props) => {
  const [data, setData] = useState();

  const fetchTeacher = async () => {
    try {
      const name = await getStudentsByTeacherId(props?.userData?.id);
      console.log('name',name)
      setData(name);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="teacher-container">
      <h2 className="teacher-title">Teacher Dashboard</h2>
      
      {!data && <button onClick={fetchTeacher} className="teacher-button">
        Get My Class Information
      </button>}

    {data && (
  <div className="teacher-result">
    {Array.isArray(data) && data.length > 0 ? (
      <div >
        <h3>Class Students</h3>
        <ul className="student-list">
          {data.map((item, index) => (
            <li key={index} className="student-item">
              <strong>Name:</strong> {item.name}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>No students available</p>
    )}
  </div>
)}

      

    </div>
  );
};

export default Teacher;
