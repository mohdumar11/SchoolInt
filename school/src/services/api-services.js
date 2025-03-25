const BASE_URL = "http://localhost:8080/api";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/students/login?email=${email}&password=${password}`, {
      method: "POST",
    });

    if (!response.ok) throw new Error("Login failed");

    return response.json(); // If the backend returns a JSON response
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};


export const getStudentById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/students/user/${id}`);
    if (!response.ok) {
      throw new Error("Student not found");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const getTeacherByStudentId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/students/user/${id}/teacher-name`);
    if (!response.ok) {
      throw new Error("Teacher not found");
    }
    return response.text();
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};


export const getStudentsByTeacherId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/students/teacher/user/${id}/students`);
    if (!response.ok) {
      throw new Error("Teacher not found");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};

export const getAllStudentsAndTeachers = async (userId) => {
  const response = await fetch(`${BASE_URL}/students/all-users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
