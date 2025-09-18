import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()}>
      <Typography variant="h6" mb={2}>Đăng ký</Typography>
      <TextField label="Tên" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Mật khẩu" type="password" fullWidth margin="normal" />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
      <Button
        variant="text"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate('/login')}
      >
        Đã có tài khoản? Đăng nhập
      </Button>
    </Box>
  );
}
