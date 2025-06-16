// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [user, setUser] = useState(null);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // call api đăng nhập
//     const login = () => {
//     if (!username || !password) return;
//     fetch("http://localhost:4000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Đăng nhập không thành công");
//         return res.json();
//       })
//       .then((data) => {
//         setUser(data.token);
//         console.log("Đăng nhập thành công:", data);
//         setUsername("");
//         setPassword("");
//       })
//       .catch((error) => {
//         console.error("Lỗi đăng nhập:", error);
//         alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
//       });
//   };
//   // Lấy danh sách task từ backend
//   const fetchTasks = () => {
//     fetch("http://localhost:4000/api/tasks")
//       .then((res) => res.json())
//       .then((data) => setTasks(data))
//       .catch(console.error);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Thêm task mới
//   const addTask = () => {
//     if (!newTaskTitle.trim()) return;
//     fetch("http://localhost:4000/api/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: newTaskTitle }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setNewTaskTitle("");
//         fetchTasks();
//       });
//   };

//   // Toggle completed
//   const toggleCompleted = (task) => {
//     fetch(`http://localhost:4000/api/tasks/${task._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: task.title, completed: !task.completed }),
//     })
//       .then((res) => res.json())
//       .then(() => fetchTasks());
//   };

//   // Xóa task
//   const deleteTask = (id) => {
//     fetch(`http://localhost:4000/api/tasks/${id}`, { method: "DELETE" }).then(
//       () => fetchTasks()
//     );
//   };

//   return (user ? ( 
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//       <h1> To - Do List App </h1>{" "}
//       <div style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           placeholder="Nhập công việc mới..."
//           style={{ width: "70%", padding: 8 }}
//         />{" "}
//         <button onClick={addTask} style={{ padding: 8, marginLeft: 8 }}>
//           {" "}
//           Thêm{" "}
//         </button>{" "}
//       </div>{" "}
//       <ul style={{ listStyle: "none", paddingLeft: 0 }}>
//         {" "}
//         {tasks.map((task) => (
//           <li
//             key={task._id}
//             style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
//           >
//             <input
//               type="checkbox"
//               checked={task.completed}
//               onChange={() => toggleCompleted(task)}
//             />{" "}
//             <span
//               style={{
//                 flex: 1,
//                 marginLeft: 8,
//                 textDecoration: task.completed ? "line-through" : "none",
//               }}
//             >
//               {" "}
//               {task.title}{" "}
//             </span>{" "}
//             <button
//               onClick={() => deleteTask(task._id)}
//               style={{ marginLeft: 8 }}
//             >
//               {" "}
//               Xóa{" "}
//             </button>{" "}
//           </li>
//         ))}{" "}
//       </ul>{" "}
//     </div>
//     ) : (
//     <div style={{ textAlign: "center", marginTop: 50 }}>
//       <h2> Vui lòng đăng nhập để sử dụng ứng dụng </h2>
//       <input type ="text" placeholder="Tên đăng nhập" style={{ padding: 10, fontSize: 16 }} />
//       <input type ="password" placeholder="Mật khẩu" style={{ padding: 10, fontSize: 16, marginLeft: 10 }} />
//       <br />
//       <button className="btn"
//         onClick={() => {
//             setUsername(document.querySelector('input[type="text"]').value);
//             setPassword(document.querySelector('input[type="password"]').value);
//             login();
//         }}
//         style={{ padding: 10, fontSize: 16 }}
//       >
//         {" "}
//         Đăng nhập{" "}
//       </button>
      
//         <button className="btn" onClick ={() => {
//             setUsername(document.querySelector('input[type="text"]').value);
//             setPassword(document.querySelector('input[type="password"]').value);
//             fetch("http://localhost:4000/api/auth/register", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ username, password }),
//             })
//               .then((res) => {
//                 if (!res.ok) throw new Error("Đăng ký không thành công");
//                 return res.json();
//               })
//               .then((data) => {
//                 alert("Đăng ký thành công!");
//                 setUsername("");
//                 setPassword("");
//               })
//               .catch((error) => {
//                 console.error("Lỗi đăng ký:", error);
//                 alert("Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.");
//               });
//         }} style={{ padding: 10, fontSize: 16, marginLeft: 10 }}>
//         Đăng ký 
//         </button>   
        
//     </div>
//   ));
// }

// export default App;
