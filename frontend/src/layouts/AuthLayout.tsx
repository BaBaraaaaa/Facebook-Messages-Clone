import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
      }}
    >
      <Paper
        elevation={6}
        sx={{ p: 4, width: 400, borderRadius: 3, backgroundColor: '#fff' }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Chat App
        </Typography>
        <Outlet />  {/* Hiển thị Login hoặc Register */}
      </Paper>
    </Box>
  );
}
