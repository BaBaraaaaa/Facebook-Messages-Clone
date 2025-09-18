import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { useForm } from "react-hook-form";
import { registerDispatch } from "../redux/authSlice";
interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
    dispatch(registerDispatch(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" mb={2}>
        Đăng ký
      </Typography>
      <TextField
        label="Tên"
        fullWidth
        margin="normal"
        {...register("name", { required: "Tên là bắt buộc" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", { required: "Email là bắt buộc" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", { required: "Mật khẩu là bắt buộc" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
      <Button
        variant="text"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate("/login")}
      >
        Đã có tài khoản? Đăng nhập
      </Button>
    </Box>
  );
}
