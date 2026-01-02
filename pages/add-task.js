import { useState } from "react";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function AddTask() {
  const router = useRouter();
  const [task, setTask] = useState({ date:new Date().toISOString().split("T")[0], employee:'', taskName:'', status:'', hours:'' });

  const save = async () => {
    await fetch('/api/tasks', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(task)
    });
    router.push('/');
  };

  return (
    <Layout>
      <Paper sx={{ p:3, maxWidth:500 }}>
        <Typography variant="h6">Add Task</Typography>
       {Object.keys(task).map(k => {
          if (k === "id") return null;

          if (k === "date") {
            return (
              <TextField
                key={k}
                label="Date"
                type="date"
                value={task[k]}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                onChange={e => setTask({ ...task, [k]: e.target.value })}
              />
            );
          }

          if (k === "status") {
            return (
              <TextField
                key={k}
                label="Status"
                select
                value={task[k]}
                fullWidth
                margin="normal"
                onChange={e => setTask({ ...task, [k]: e.target.value })}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            );
          }

          return (
            <TextField
              key={k}
              label={k.charAt(0).toUpperCase() + k.slice(1)}
              type={k === "hours" ? "number" : "text"}
              value={task[k]}
              fullWidth
              margin="normal"
              onChange={e => setTask({ ...task, [k]: e.target.value })}
            />
          );
        })}
        <Button variant="contained" onClick={save}>Save</Button>
      </Paper>
    </Layout>
  );
}
