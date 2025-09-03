import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { addExpense } from "../api/authApi";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setNote("");
    setDate(dayjs().format("YYYY-MM-DD"));
    setImage(null);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid income amount.");
      return;
    }
    if (!category.trim()) {
      setError("Please enter an income category.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not logged in. Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", String(amount));
    formData.append("category", category);
    formData.append("note", note);
    formData.append("date", date);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await addExpense(token, formData, amount, category, note, date);
      setSuccess("Expense added successfully!");
      resetForm();
    } catch (err) {
      console.error("Error adding expense:", err);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          p: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            color: "#3d5afe",
            mb: 2,
          }}
        >
          Add Expense
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Stack spacing={2}>
          {/* Amount */}
          <TextField
            label="Amount (₹)"
            type="number"
            fullWidth
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          {/* Category */}
          <TextField
            label="Category"
            fullWidth
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Salary, Freelance"
          />

          {/* Note */}
          <TextField
            label="Note"
            fullWidth
            size="small"
            multiline
            minRows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional notes"
          />

          {/* Date */}
          <TextField
            label="Date"
            type="date"
            fullWidth
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          {/* File Upload */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              color: image ? "#16a34a" : "#333",
              borderColor: "#ccc",
            }}
          >
            {image ? image.name : "Upload Image (optional)"}
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </Button>

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              backgroundColor: "#22c55e",
              "&:hover": { backgroundColor: "#16a34a" },
              textTransform: "none",
              fontWeight: 600,
              py: 1.3,
              borderRadius: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Submit Income"
            )}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddExpense;
