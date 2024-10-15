const express = require("express");
const app = express();
const port = 8000;

app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어

// nodemon을 설치하고 이를 통해

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
  { id: 1, contents: "밥먹기", isComplete: false },
  { id: 2, contents: "똥싸기", isComplete: true },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/addtodo", (req, res) => {
  const newTodo = { id: todos.length + 1, contents: req.body.contents };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
