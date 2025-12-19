import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // 🔐 Check admin session + load todos
  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.role !== "ADMIN") {
          navigate("http://localhost:3000");
        } else {
          loadTodos();
        }
      })
      .catch(() => navigate("http://localhost:3000"));
  }, [navigate]);

  // 📌 Load todos
  const loadTodos = () => {
    fetch("http://localhost:8080/todos/getall", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  // ➕ Add / ✏️ Update Todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      title,
      description,
      completed,
    };

    if (editingId) {
      // UPDATE
      await fetch(`http://localhost:8080/todos/updatetodo/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(todoData),
      });
    } else {
      // ADD
      await fetch("http://localhost:8080/todos/saveTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(todoData),
      });
    }

    resetForm();
    loadTodos();
  };

  // ✏️ Edit Todo
  const editTodo = (todo) => {
    setEditingId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
  };

  // 🗑 Delete Todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8080/todos/deletetodo/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    loadTodos();
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("http://localhost:3000");
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* ➕ Add / Update Todo */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />{" "}
          Completed
        </label>

        <button type="submit">
          {editingId ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      <hr />

      {/* 📋 Todos List */}
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.item}>
            <div>
              <b>{todo.title}</b>
              <p>{todo.description}</p>
              <small>
                Status:{" "}
                <span style={{ color: todo.completed ? "green" : "red" }}>
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </small>
            </div>

            <div>
              <button onClick={() => editTodo(todo)}>Edit</button>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: "5px", background: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logout: {
    padding: "6px 12px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default AdminDashboard;
