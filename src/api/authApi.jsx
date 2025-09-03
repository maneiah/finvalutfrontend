import axios from "axios";

const BASE_URL = "http://localhost:8081/api/auth";

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No auth token found");

  const response = await axios.get("http://localhost:8081/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // Assuming response contains { name: "User Name", ... }
};

export const addIncome = async (
  token,
  formData,
  amount,
  category,
  note,
  date
) => {
  const response = await axios.post(
    "http://localhost:8083/api/transactions",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        amount: amount,
        type: "INCOME",
        category: category,
        note: note,
        date: date,
      },
    }
  );

  return response.data;
};

export const addExpense = async (
  token,
  formData,
  amount,
  category,
  note,
  date
) => {
  const response = await axios.post(
    "http://localhost:8083/api/transactions",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        amount: amount,
        type: "EXPENSE",
        category: category,
        note: note,
        date: date,
      },
    }
  );

  return response.data;
};



export const getTransactionHistory = async (token) => {
  try {
    const response = await axios.get("http://localhost:8083/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Expecting an array of transactions
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
};
