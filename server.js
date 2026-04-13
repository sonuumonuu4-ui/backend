import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS — manual middleware applied FIRST, before everything else
// This ensures CORS headers are on ALL responses including errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ─── IN-MEMORY DATABASE ─────────────────────────────
let students = [
  {
    id: 'STU1001',
    firstName: 'Arjun',
    lastName: 'Raval',
    cls: 'Class 10',
    section: 'A',
    gender: 'Male',
    dob: '2008-05-10',
    parent: 'Rajesh Raval',
    phone: '9876543210',
    address: 'Ahmedabad',
    status: 'Active',
    att: 92
  },
  {
    id: 'STU1002',
    firstName: 'Priya',
    lastName: 'Shah',
    cls: 'Class 9',
    section: 'B',
    gender: 'Female',
    dob: '2009-08-21',
    parent: 'Amit Shah',
    phone: '9123456780',
    address: 'Surat',
    status: 'At Risk',
    att: 68
  },
  {
    id: 'STU1003',
    firstName: 'Diya',
    lastName: 'Patel',
    cls: 'Class 11',
    section: 'C',
    gender: 'Female',
    dob: '2007-03-15',
    parent: 'Suresh Patel',
    phone: '9988776655',
    address: 'Vadodara',
    status: 'At Risk',
    att: 71
  },
  {
    id: 'STU1004',
    firstName: 'Rohan',
    lastName: 'Mehta',
    cls: 'Class 12',
    section: 'A',
    gender: 'Male',
    dob: '2006-11-02',
    parent: 'Kiran Mehta',
    phone: '9871234560',
    address: 'Rajkot',
    status: 'Active',
    att: 95
  },
  {
    id: 'STU1005',
    firstName: 'Sneha',
    lastName: 'Joshi',
    cls: 'Class 9',
    section: 'A',
    gender: 'Female',
    dob: '2009-07-22',
    parent: 'Nilesh Joshi',
    phone: '9345678901',
    address: 'Gandhinagar',
    status: 'Active',
    att: 88
  },
  {
    id: 'STU1006',
    firstName: 'Karan',
    lastName: 'Desai',
    cls: 'Class 10',
    section: 'B',
    gender: 'Male',
    dob: '2008-01-30',
    parent: 'Bharat Desai',
    phone: '9012345678',
    address: 'Surat',
    status: 'Inactive',
    att: 55
  }
];

// ─── HELPER ─────────────────────────────
function generateId() {
  return 'STU' + Math.floor(1000 + Math.random() * 9000);
}

// ─── ROUTES ─────────────────────────────

// Health check (also keeps Render alive)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🚀 EduCore API is running',
    students: students.length,
    timestamp: new Date().toISOString()
  });
});

// GET all students
app.get('/api/students', (req, res) => {
  res.json({ success: true, data: students });
});

// GET single student
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.json({ success: true, data: student });
});

// CREATE student
app.post('/api/students', (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'firstName and lastName are required' });
  }
  const newStudent = {
    id: generateId(),
    ...req.body,
    att: parseInt(req.body.att) || 0
  };
  students.push(newStudent);
  res.status(201).json({ success: true, message: 'Student added', data: newStudent });
});

// UPDATE student
app.put('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  students[index] = {
    ...students[index],
    ...req.body,
    id: students[index].id, // prevent id overwrite
    att: parseInt(req.body.att ?? students[index].att) || 0
  };
  res.json({ success: true, message: 'Student updated', data: students[index] });
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  const deleted = students.splice(index, 1);
  res.json({ success: true, message: 'Student deleted', data: deleted[0] });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ─── START SERVER ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 EduCore API running on port ${PORT}`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   CORS: open (all origins allowed)`);
});
