import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../api/authApi";
import {
  CircularProgress,
  Alert,
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Avatar,
} from "@mui/material";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token missing. Please login again.");
          setLoading(false);
          return;
        }

        const data = await getTransactionHistory(token);

        // Sort by latest first (by id descending)
        setTransactions([...data].sort((a, b) => b.id - a.id));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h5" align="center" gutterBottom color="primary">
        Transaction History
      </Typography>

      <Grid container spacing={2}>
        {transactions.map((txn) => (
          <Grid item xs={12} sm={6} md={4} key={txn.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Grid container spacing={1} alignItems="center">
                {/* Image or Default Avatar */}
                <Grid item>
                  {txn.imageUrl ? (
                    <Avatar
                      variant="rounded"
                      src={`http://localhost:8083${txn.imageUrl}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor:
                          txn.type === "EXPENSE"
                            ? "error.main"
                            : "success.main",
                        width: 56,
                        height: 56,
                        color: "#fff",
                      }}
                    >
                      {txn.type.charAt(0)}
                    </Avatar>
                  )}
                </Grid>

                {/* Main Info */}
                <Grid item xs>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ₹{txn.amount} - {txn.category}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {txn.date}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {txn.note || "-"}
                  </Typography>
                </Grid>

                {/* Type Chip */}
                <Grid item xs={12}>
                  <Chip
                    label={txn.type}
                    color={txn.type === "EXPENSE" ? "error" : "success"}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TransactionHistory;
