import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import MenuItem from "@mui/material/MenuItem";


export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

 useEffect(() => {
  if (!id) return;

  fetch(`/api/tasks/${id}`)
    .then(res => res.json())
    .then(setTask);
}, [id]);

  const update = async () => {
    await fetch('/api/tasks/'+id, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(task)
    });
    router.push('/');
  };

  if(!task) return null;

  return (
    <Layout>
      <Paper sx={{ p:3, maxWidth:500 }}>
        <Typography variant="h6">Edit Task</Typography>
        {Object.keys(task).map(k => {
            if (k === "_id") return null;

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
                type={k === "date" ? "date" : k === "hours" ? "number" : "text"}
                value={task[k]}
                fullWidth
                margin="normal"
                InputLabelProps={k === "date" ? { shrink: true } : {}}
                onChange={e => setTask({ ...task, [k]: e.target.value })}
              />
            );
          })}



        <Button variant="contained" color="success" onClick={update}>Update</Button>
      </Paper>
    </Layout>
  );
}
