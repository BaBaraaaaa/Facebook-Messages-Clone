
import React from "react";
import { Box, Typography, IconButton, Stack, Avatar, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function ChatHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/login");
  };
  const handleEditProfile = () => {
    handleMenuClose();
    navigate("/profile/edit");
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "primary.main",
        background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: 2,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        minHeight: 64,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <img src="/vite.svg" alt="Logo" style={{ width: 36, height: 36, marginRight: 8 }} />
        <Typography variant="h6" fontWeight={800} letterSpacing={1} sx={{ userSelect: "none" }}>
          Messages Clone
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={2}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Avatar
            src={user?.avatarUrl || undefined}
            alt={user?.name || "User Avatar"}
            sx={{ width: 36, height: 36, border: '2px solid #fff', boxShadow: 1 }}
          />
          <Typography variant="body1" fontWeight={600} sx={{ textShadow: '0 1px 2px #1976d2' }}>
            {user?.name || "User"}
          </Typography>
        </Stack>
        <Tooltip title="Tùy chọn">
          <IconButton
            sx={{ color: "#fff", transition: 'background 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEditProfile}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Chỉnh sửa trang cá nhân</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}
