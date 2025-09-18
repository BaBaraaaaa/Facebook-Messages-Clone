import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/authSchema";
import { useAppDispatch } from "../redux/hook";
import { login } from "../redux/authSlice";
interface LoginForm {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: LoginForm) => {
    console.log(data);
    dispatch(login(data)).then(() => {
      navigate("/");
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" mb={2}>
        Đăng nhập
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
      <Button
        variant="text"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate("/register")}
      >
        Chưa có tài khoản? Đăng ký
      </Button>
    </Box>
  );
}
