// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/authApi";

export default function RegisterPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic frontend validation before API call
  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim()) return "Email is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return "Invalid email format.";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters.";
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
      const res = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      alert(res.message);

      const loginRes = await loginUser(formData.email, formData.password);
      localStorage.setItem("token", loginRes.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          Register
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
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
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link
            href="/"
            underline="hover"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              "&:hover": { color: "#0d47a1" },
            }}
          >
            Login here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
