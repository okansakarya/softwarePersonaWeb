import { TodoItem } from "./TodoItem";
import type { Todo } from "../Interfaces/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({
  todos,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 py-8 text-center text-gray-500 dark:text-gray-400">
        Henüz görev yok. Yukarıdan yeni görev ekleyebilirsiniz.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
