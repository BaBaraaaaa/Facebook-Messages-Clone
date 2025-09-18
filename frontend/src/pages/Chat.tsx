import { Box, Typography } from '@mui/material';

export default function Chat() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Thanh header */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.main',
          color: '#fff',
        }}
      >
        <Typography variant="h6">Facebook Messages Clone</Typography>
      </Box>

      {/* Nội dung chat */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          p: 2,
          bgcolor: '#fafafa',
        }}
      >
        <Typography>
          Đây là khu vực chat – sau này sẽ hiển thị danh sách conversation và tin nhắn.
        </Typography>
      </Box>
    </Box>
  );
}
