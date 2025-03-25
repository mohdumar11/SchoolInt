import { useState } from "react";
import { login, getStudentById,getStudentsByTeacherId } from "../services/api-services";
import "../style.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const user = await login(email, password);

    if (user) {
      if (user.role === "STUDENT") {
        const studentData = await getStudentById(user.id);
        if (studentData) {
          console.log("Student Data:", studentData);
          onLoginSuccess({ ...user, student: studentData }); 
        } else {
          setError("Failed to fetch student details");
        }
      }
      else if (user.role === "TEACHER") {
        const teacherData = await getStudentsByTeacherId(user.id);
         if (teacherData) {
          console.log("teacherData", teacherData);
          onLoginSuccess({ ...user, teacher: teacherData }); 
        } else {
          setError("Failed to fetch student details");
        }
      } else {
        onLoginSuccess(user);
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
};

export default Login;
