"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Todo {
  id: string
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Create a new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    if (editingId === id) {
      setEditingId(null)
    }
  }

  // Toggle todo completion status
  const toggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Start editing a todo
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editingId === null) return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container max-w-2xl mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTodo()
                }}
              />
              <Button onClick={addTodo}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <Card key={todo.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {editingId === todo.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit()
                            if (e.key === "Escape") cancelEdit()
                          }}
                          autoFocus
                        />
                        <Button size="icon" variant="ghost" onClick={saveEdit}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                          onClick={() => toggleComplete(todo.id)}
                        >
                          {todo.text}
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(todo)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

