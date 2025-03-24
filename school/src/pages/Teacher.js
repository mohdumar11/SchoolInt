import React, { useState } from "react";
import { getStudentsByTeacherId } from "../services/api-services";
import "../style.css";

const Teacher = (props) => {
  const [studentId, setStudentId] = useState("");
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
      <h2 className="teacher-title">Teacher Details</h2>
      
      <button onClick={fetchTeacher} className="teacher-button">
        Get My Class Information
      </button>

      {data && <p className="teacher-result"><b>Teacher:</b> {data}</p>}
    </div>
  );
};

export default Teacher;
