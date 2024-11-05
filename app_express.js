const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Mock database
const students = [
  {
    name: 'John Doe',
    rollNumber: '2023001',
    department: 'Computer Science',
    semester: 1,
  },
  {
    name: 'Alice Smith',
    rollNumber: '2023002',
    department: 'Mathematics',
    semester: 2,
  },
];

// Create a new student
app.post('/students', (req, res) => {
  const { name, rollNumber, department, semester } = req.body;
    console.log(req.body);
  // Validate input
  if (!name || !rollNumber || !department || !semester) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Create a new student object
  const newStudent = { name, rollNumber, department, semester };
  students.push(newStudent); // Add the new student to the mock database
  res.status(201).json(newStudent); // Respond with the created student
});

// Get all students
app.get('/students', (req, res) => {
  res.json(students); // Respond with the array of students
});

// Get a student by roll number
app.get('/students/:rollNumber', (req, res) => {
  const { rollNumber } = req.params;
  const student = students.find(s => s.rollNumber === rollNumber); // Find student by roll number

  if (student) {
    res.json(student); // Respond with the found student
  } else {
    res.status(404).json({ error: 'Student not found.' }); // Handle student not found
  }
});

// Update a student by roll number
app.put('/students/:rollNumber', (req, res) => {
  const { rollNumber } = req.params;
  console.log(req.params);
  const { name, department, semester } = req.body; // Get the updated data

  const studentIndex = students.findIndex(s => s.rollNumber === rollNumber); // Find the student index

  if (studentIndex !== -1) {
    // Update student data
    students[studentIndex].name = name || students[studentIndex].name;
    students[studentIndex].department = department || students[studentIndex].department;
    students[studentIndex].semester = semester || students[studentIndex].semester;

    res.json(students[studentIndex]); // Respond with the updated student
  } else {
    res.status(404).json({ error: 'Student not found.' }); // Handle student not found
  }
});

// Delete a student by roll number
app.delete('/students/:rollNumber', (req, res) => {
  const { rollNumber } = req.params;
  const studentIndex = students.findIndex(s => s.rollNumber === rollNumber); // Find student index

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1); // Remove student from the array
    res.status(204).send(); // Respond with no content
  } else {
    res.status(404).json({ error: 'Student not found.' }); // Handle student not found
  }
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});