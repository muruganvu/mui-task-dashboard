import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Daily Task Dashboard
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} href="/add-task">
            Add Task
          </Button>
          
        </Toolbar>
        </Container>
      </AppBar>
      
{/* 
      <Drawer variant="permanent" sx={{ width: 220 }}>
        <Toolbar />
       
      </Drawer> */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
