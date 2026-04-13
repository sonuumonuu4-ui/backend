const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ─── IN-MEMORY DATABASE ─────────────────────────────
let students = [
  {
    id: "STU1001",
    firstName: "Arjun",
    lastName: "Raval",
    cls: "Class 10",
    section: "A",
    gender: "Male",
    dob: "2008-05-10",
    parent: "Rajesh Raval",
    phone: "9876543210",
    address: "Ahmedabad",
    status: "Active",
    att: 92
  },
  {
    id: "STU1002",
    firstName: "Priya",
    lastName: "Shah",
    cls: "Class 9",
    section: "B",
    gender: "Female",
    dob: "2009-08-21",
    parent: "Amit Shah",
    phone: "9123456780",
    address: "Surat",
    status: "At Risk",
    att: 68
  }
];

// Helper to generate ID
function generateId() {
  return "STU" + Math.floor(1000 + Math.random() * 9000);
}

// ─── ROUTES ─────────────────────────────

// GET all students
app.get('/api/students', (req, res) => {
  res.json({ success: true, data: students });
});

// GET single student
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }
  res.json({ success: true, data: student });
});

// ADD student
app.post('/api/students', (req, res) => {
  const newStudent = {
    id: generateId(),
    ...req.body
  };
  students.push(newStudent);
  res.json({ success: true, message: "Student added", data: newStudent });
});

// UPDATE student
app.put('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  students[index] = {
    ...students[index],
    ...req.body
  };

  res.json({ success: true, message: "Student updated", data: students[index] });
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  res.json({ success: true, message: "Student deleted", data: deleted[0] });
});

// ─── START SERVER ─────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
