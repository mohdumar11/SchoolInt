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
      <h2 className="teacher-title">Teacher Details</h2>
      
      <button onClick={fetchTeacher} className="teacher-button">
        Get My Class Information
      </button>

     {data && (
  <div className="teacher-result">
    {data && Array.isArray(data) && data.length > 0 ? (
            <div className="teacher-result">
              
              {data.map((item, index) => (
      
                <p key={index}>
           {index + 1} &nbsp; Name: {item.name}
</p>
                
              ))}
              
            </div>
            
          ) : (
              
              <p>No data available</p>
              
          )}
          

        </div>
        
      )}
      

    </div>
  );
};

export default Teacher;
