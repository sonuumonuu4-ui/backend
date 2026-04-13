import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory array (acts like database)
let students = [
  { id: 1, name: "Rahul", age: 20, course: "BCA" },
  { id: 2, name: "Anita", age: 22, course: "BBA" }
];


// ✅ GET all students
app.get("/students", (req, res) => {
  res.json(students);
});


// ✅ GET single student
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});


// ✅ CREATE student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


// ✅ UPDATE student
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;

  student.name = name || student.name;
  student.age = age || student.age;
  student.course = course || student.course;

  res.json(student);
});


// ✅ DELETE student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);
  res.json({ message: "Deleted", data: deletedStudent });
});


// Default route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});


// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});