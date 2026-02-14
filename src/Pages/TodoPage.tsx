import { useState, useCallback, useEffect } from "react";
import { TodoForm } from "../Components/TodoForm";
import { TodoList } from "../Components/TodoList";
import { ApiUserList } from "../Components/ApiUserList";
import type { Todo } from "../Interfaces/todo";
import type { ApiUser } from "../Interfaces/apiUser";
import { fetchUsers } from "../utils/api";

const STORAGE_KEY = "todo-app-items";

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(todos: Todo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // ignore
  }
}

function createTodo(title: string): Todo {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage());
  const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  const loadApiUsers = useCallback(async () => {
    setApiLoading(true);
    setApiError(null);
    try {
      const users = await fetchUsers();
      setApiUsers(users);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu");
    } finally {
      setApiLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApiUsers();
  }, [loadApiUsers]);

  const handleAdd = useCallback((title: string) => {
    setTodos((prev) => [createTodo(title), ...prev]);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  }, []);

  const handleUpdate = useCallback((id: string, title: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t)),
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Todo Uygulaması
      </h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <section className="mt-10">
        <ApiUserList
          users={apiUsers}
          loading={apiLoading}
          error={apiError}
          onRefresh={loadApiUsers}
        />
      </section>
    </div>
  );
}
