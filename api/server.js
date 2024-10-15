const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어

// 간단한 라우트 정의
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// RESTful API 엔드포인트 정의
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

let todos = [
  { id: 1, contents: "밥먹기", isCompleted: false },
  { id: 2, contents: "똥싸기", isCompleted: true },
];

// 모든 API 경로에 '/api' 추가
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/api/addtodo", (req, res) => {
  const newTodo = { id: todos.length + 1, contents: req.body.contents };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
