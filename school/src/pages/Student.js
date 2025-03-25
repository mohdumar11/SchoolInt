import { useState } from "react";
import { getTeacherByStudentId } from "../services/api-services";  // ✅ Correct import
import "../style.css";

const Student = (props) => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  console.log('nitin99999',props?.userData)

  const fetchStudent = async () => {
    try {
      console.log('nitin44444',studentId)
      const data = await getTeacherByStudentId(props?.userData?.student?.studentId);
      console.log('nitin1111',data)
      setStudentData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="student-container">
      <h2 className="student-title">Student Dashboard</h2>
      
      {!studentData && <button onClick={fetchStudent} className="student-button">
        Get ClassTeacher Info
      </button>}
                
      <div className="teacher-result">
        {studentData && <h3 >Class Teacher</h3>}
      {studentData && (
        
        <div className="student-result">
    <p className="student-name"><b>Name:</b> {studentData}</p>
  </div>
)}</div>

    </div>
  );
};

export default Student;
