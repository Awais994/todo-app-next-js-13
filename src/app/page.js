import TodoForm from "@/components/TodoForm";
import { getTodo } from "./api/todoList/route";
export default async function Home() {
  const { data } = await getTodo();
  return (
    <main>
      <TodoForm data={data} />
    </main>
  );
}
