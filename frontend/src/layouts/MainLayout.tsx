import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Có thể thêm Header, Sidebar... */}
      <Outlet />
    </Box>
  );
};

export default MainLayout;
