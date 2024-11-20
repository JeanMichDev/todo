import prisma from "@/lib/db";

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
