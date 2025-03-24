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
      <h2 className="student-title">Student Details</h2>
      
      <button onClick={fetchStudent} className="student-button">
        Get ClassTeacher Info
      </button>

      {studentData && (
        <div className="student-result">
          <p><b>Name:</b> {studentData}</p>
        </div>
      )}
    </div>
  );
};

export default Student;
