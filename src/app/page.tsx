"use client";

import { useEffect, useState } from "react";
type todoType = {
  id: number;
  contents: string;
  isCompleted: boolean;
};
export default function Home() {
  const [todos, setTodos] = useState<todoType[]>([]);
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    const fetchTodos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todos`
        );
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);
  return (
    <>
      <div>
        <h1>api-test</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.contents} - {todo.isCompleted ? "완료" : "미완료"}{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
