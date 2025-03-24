-- Create the user table first
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the teacher table second
CREATE TABLE IF NOT EXISTS teacher (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the student table third (after teacher)
CREATE TABLE IF NOT EXISTS student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255),
    teacher_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);

-- Then insert your data in the correct order
-- Insert users first
INSERT INTO users (id, username, email, password, role) VALUES
(1, 'johndoe1', 'john.doe@example.com', 'umar12', 'STUDENT'),
(2, 'johndoe2', 'john.doe2@example.com', 'umar12', 'STUDENT'),
(3, 'johndoe3', 'john.doe3@example.com', 'umar12', 'STUDENT'),
(4, 'mrsmith1', 'mr.smith4@example.com', 'umar12', 'TEACHER'),
(5, 'mrsmith2', 'mr.smith5@example.com', 'umar12', 'TEACHER'),
(6, 'principal', 'principal@example.com', 'umar12', 'PRINCIPAL');

-- Insert teachers second
INSERT INTO teacher (id, user_id, name) VALUES
(1, 4, 'Mr. Smith'),
(2, 5, 'Mrs. Johnson');

-- Insert students last
INSERT INTO student (id, user_id, name, teacher_id) VALUES
(1, 1, 'Nitin', 1),
(2, 2, 'Mannu', 2),
(3, 3, 'Umar', 1);