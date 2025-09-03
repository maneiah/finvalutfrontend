import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getUserProfile } from "../api/authApi";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import HistoryIcon from "@mui/icons-material/History";
const drawerWidth = 240;

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUserName(profileData.name);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarCollapse = () => {
    setOpen(!open);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff", // changed to white background
        color: "#000", // default text color black
      }}
    >
      <Toolbar sx={{ justifyContent: "center", minHeight: "64px" }}>
        <Box
          component="img"
          src="https://i.ibb.co/pBLsTjxZ/finvault.png"
          alt="FinVault Logo"
          sx={{
            width: open ? 149 : 40, // Expand = full width, Collapse = small
            height: open ? 60 : 40, // Expand = full height, Collapse = small
            objectFit: "contain",
            transition: "all 0.3s ease", // Smooth transition on toggle
          }}
        />
      </Toolbar>

      <Box sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <Divider sx={{ borderColor: "#f5f5f5" }} />
      </Box>

      <List>
        {[
          { label: "Dashboard", icon: <HomeIcon />, path: "/dashboard/home" },
          {
            label: "Add Income",
            icon: <AttachMoneyIcon />,
            path: "/dashboard/add-income",
          },
          {
            label: "Add Expense",
            icon: <MoneyOffIcon />,
            path: "/dashboard/add-expense",
          },
          {
            label: "Transaction History",
            icon: <HistoryIcon />,
            path: "/dashboard/transaction-history",
          },
        ].map(({ label, icon, path }) => (
          <ListItem
            button
            key={label}
            onClick={() => handleNavigation(path)}
            sx={{
              color: "#000",
              minWidth: open ? "auto" : 60,
              justifyContent: open ? "initial" : "center",
              px: 2,
              borderRadius: 3,

              mb: 0.8,
              "&:hover": {
                backgroundColor: "#e0f2fe", // light blue background on hover
                color: "#0284c7", // blue text on hover
                "& svg": { color: "#0284c7" }, // icon color on hover
              },
              // You can also add styles for active state here if you want
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: open ? 40 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            {open && <ListItemText primary={label} />}
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: "auto" }}>
        {open ? (
          <Button
            variant="contained"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "#ffffff", // White background
              color: "#000000", // Black text and icon
              justifyContent: "center",
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#e0f2fe", // Light blue on hover
                color: "#0284c7", // Blue text and icon on hover
              },
              "& .MuiSvgIcon-root": {
                color: "inherit", // Inherit icon color from button
              },
            }}
          >
            Logout
          </Button>
        ) : (
          <IconButton
            onClick={handleLogout}
            sx={{
              backgroundColor: "#ffffff", // White background
              color: "#000000", // Black icon
              width: "100%",
              justifyContent: "center",
              borderRadius: 1,
              height: 48,
              "&:hover": {
                backgroundColor: "#e0f2fe", // Light blue on hover
                color: "#0284c7", // Blue icon on hover
              },
              "& .MuiSvgIcon-root": {
                color: "inherit", // Icon inherits color
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
  

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#ffffff",
          color: "#000",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Bottom side shadow // ✅ No shadow
          border: "none", // ✅ No border
          width: { sm: `calc(100% - ${open ? drawerWidth : 60}px)` },
          ml: { sm: `${open ? drawerWidth : 60}px` },
          // transition: "all 0.3s",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Sidebar Collapse Button (Desktop only) */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleSidebarCollapse}
              sx={{ mr: 2, display: { xs: "none", sm: "inline-flex" } }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>

            {/* Mobile Drawer Toggle */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Title: Hidden on Mobile */}
            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {userName}
            </Typography>

            <IconButton onClick={handleProfileClick}>
              <Avatar sx={{ bgcolor: "#1976d2", width: 36, height: 36 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleProfileClose();
                  handleNavigation("/dashboard/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleProfileClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: open ? drawerWidth : 60 },
          flexShrink: 0,
        }}
      >
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : 60,
              transition: "width 0.3s",
              overflowX: "hidden",
              backgroundColor: "#ffffff", // white
              color: "#000", // black text
              boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)", // RIGHT side shadow only
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#ffffff",
              color: "#000",
              boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)", // RIGHT side shadow only
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          mt: "64px",
          minHeight: "calc(100vh - 64px)",
          transition: "all 0.3s",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 3,
            backgroundColor: "#ffffff",
            textAlign: "center",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)", // Top side shadow
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 FinValut. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
