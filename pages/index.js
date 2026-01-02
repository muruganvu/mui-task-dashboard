import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Select, MenuItem, Typography, Container } from "@mui/material";
import Link from "next/link";
import Layout from "../components/Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import Chip from "@mui/material/Chip";


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [employee, setEmployee] = useState("");

 useEffect(() => {
  fetch("/api/tasks")
    .then(r => r.json())
    .then(data => {
      const normalized = data.map(t => ({
        ...t,
        id: t._id
      }));
      setTasks(normalized);
    });
}, []);
const deleteTask = async (_id) => {
  if (!confirm("Delete this task?")) return;

  await fetch(`/api/tasks/${_id}`, { method: "DELETE" });

  // update UI instantly
  setTasks(prev => prev.filter(t => t._id !== _id));
};


  const employees = [...new Set(tasks.map(t => t.employee))];
  const filtered = employee ? tasks.filter(t => t.employee === employee) : tasks;

  const dateOptions = [...new Set(tasks.map(t => t.date))].filter(Boolean);

  const [status, setStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");


  const filteredByEmployee = employee
  ? tasks.filter(t => t.employee === employee)
  : tasks;

const filteredByDate = selectedDate
  ? filteredByEmployee.filter(task => task.date === selectedDate)
  : filteredByEmployee;

  const filteredTasks = status
  ? filteredByDate.filter(t => t.status === status)
  : filteredByDate;



  return (
    <Container>
    <Layout>
      <Typography variant="h5" gutterBottom>All Tasks</Typography>

      <Select value={employee} onChange={e => setEmployee(e.target.value)} displayEmpty sx={{ mb: 2 }}>
        <MenuItem value="">All Employees</MenuItem>
        {employees.map(emp => <MenuItem key={emp} value={emp}>{emp}</MenuItem>)}
      </Select>
      <Select
        value={status}
        onChange={e => setStatus(e.target.value)}
        displayEmpty
        sx={{ ml: 2 }}
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>

      <Select
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        displayEmpty
        sx={{ ml: 2, minWidth: 180 }}
      >
        <MenuItem value="">All Dates</MenuItem>

        {dateOptions.map(date => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </Select>


      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{width:'150px'}}>Date</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Task</TableCell>
              <TableCell sx={{width:'130px'}}>Status</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map(t => (
              <TableRow key={t._id}>
                <TableCell>{t.date}</TableCell>
                 <TableCell>{t.employee}</TableCell>
                <TableCell>{t.taskName}</TableCell>
                <TableCell>
                  <Chip
                    label={t.status}
                    color={
                      t.status === "Completed"
                        ? "success"
                        : t.status === "In Progress"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>{t.hours}</TableCell>
                <TableCell>
                  <IconButton color="error" href={`/edit-task/${t._id}`} component={Link}>
                    <EditIcon />
                  </IconButton>
                 </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => deleteTask(t._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Layout>
    </Container>
  );
}
