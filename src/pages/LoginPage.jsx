// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic validation
  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return "Invalid email format.";
    if (!formData.password) return "Password is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await loginUser(formData.email, formData.password);
      // ✅ Save token and user ID to sessionStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id);
      navigate("/dashboard/home"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          color={theme.palette.primary.main}
          gutterBottom
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            margin="normal"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1,
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" mt={2}>
          New user?{" "}
          <Link
            href="/register"
            underline="hover"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              "&:hover": { color: "#0d47a1" },
            }}
          >
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
