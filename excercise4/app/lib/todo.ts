import { ObjectId } from "mongodb";
import { CreateTodoInput, Priority, Todo, UpdateTodoInput } from "../types/todo";
import { getTodoCollection } from "./db";


const priorityWeight: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1,
};

export async function fetchTodos(search?: string, status?: string): Promise<Todo[]> {
    try {
        const collection = await getTodoCollection();
        const query: Record<string, any> = {};

        // 1. Search (MongoDB $regex)
        if (search && search.trim() !== "") {
            query.title = { $regex: search.trim(), $options: "i" };
        }

        // 2. Filter by completion status
        if (status === "completed") {
            query.completed = true;
        } else if (status === "pending") {
            query.completed = false;
        }

        const todos = await collection.find(query).toArray();

        const formattedTodos: Todo[] = todos.map((todo) => ({
            _id: todo._id.toString(),
            title: todo.title,
            completed: Boolean(todo.completed),
            priority: (todo.priority as Priority) || "medium",
            createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
            updatedAt: todo.updatedAt?.toISOString(),
        }));

      
        return formattedTodos.sort(
            (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
        );
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
    try {
        const collection = await getTodoCollection();
        const todo = await collection.findOne({ _id: new ObjectId(id) });

        if (!todo) {
            return null;
        }

        return {
            _id: todo._id.toString(),
            title: todo.title,
            completed: Boolean(todo.completed),
            priority: (todo.priority as Priority) || "medium",
            createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
            updatedAt: todo.updatedAt?.toISOString(),
        };
    } catch (error) {
        console.error("Error fetching todo by id:", error);
        return null;
    }
}

export async function createTodo(todo: CreateTodoInput): Promise<string | null> {
    try {
        const collection = await getTodoCollection();

        const result = await collection.insertOne({
            title: todo.title,
            completed: todo.completed ?? false,
            priority: todo.priority || "medium",
            createdAt: new Date(),
        });

        return result.insertedId.toString();
    } catch (error) {
        console.error("Error creating todo:", error);
        return null;
    }
}

export async function updateTodo(id: string, todo: UpdateTodoInput): Promise<boolean> {
    try {
        const collection = await getTodoCollection();

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...todo,
                    updatedAt: new Date(), 
                },
            }
        );

        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error updating todo:", error);
        return false;
    }
}

export async function deleteTodo(id: string): Promise<boolean> {
    try {
        const collection = await getTodoCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting todo:", error);
        return false;
    }
}



export async function bulkDeleteTodos(ids: string[]): Promise<boolean> {
    try {
        const collection = await getTodoCollection();
        const objectIds = ids.map((id) => new ObjectId(id));
        const result = await collection.deleteMany({ _id: { $in: objectIds } });

        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error bulk deleting todos:", error);
        return false;
    }
}

export async function markAllTodos(completed: boolean): Promise<boolean> {
    try {
        const collection = await getTodoCollection();
        const result = await collection.updateMany(
            {},
            {
                $set: {
                    completed,
                    updatedAt: new Date(),
                },
            }
        );

        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error marking all todos:", error);
        return false;
    }
}
