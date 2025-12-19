import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(true);

  const navigate = useNavigate();

  // 🔐 Fetch logged-in user
  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => navigate("/http://localhost:3000"));
  }, [navigate]);

  // 📌 Fetch all todos
  useEffect(() => {
    fetch("http://localhost:8080/todos/getall", {
      method: "GET",
      credentials: "include", // if protected
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setLoadingTodos(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingTodos(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("http://localhost:3000");
  };

  return (
    <div style={styles.container}>
      <h2>User Dashboard</h2>

      {/* 👤 User Info */}
      {user ? (
        <>
          <p><b>Name:</b> {user.fullname}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </>
      ) : (
        <p>Loading user...</p>
      )}

      <hr />

      {/* ✅ Todos Section */}
      <h3>Your Todos</h3>

      {loadingTodos ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ul style={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.todoItem}>
              <div>
                <b>{todo.title}</b>
                <p>{todo.description}</p>
              </div>
              <span
                style={{
                  color: todo.completed ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    padding: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginTop: "20px",
    padding: "8px 16px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default UserDashboard;
