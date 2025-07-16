import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import {
	Task,
	CreateTaskRequest,
	UpdateTaskRequest,
	ApiError,
} from "../src/types";
import { tasks } from "../src/store/tasks";

import { persistTasks } from "../src/store/tasks";

const app = express();

app.use(cors());
app.use(express.json());

const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error("Error:", error);

	const apiError: ApiError = {
		error: "Internal Server Error",
		message: error.message,
		statusCode: 500,
	};

	return res.status(500).json(apiError);
};

app.get("/", (req: Request, res: Response) => {
	try {
		return res.json({
			message: "Task Manager API is running on Vercel!",
			version: "1.0.0",
			endpoints: [
				"GET /api/tasks",
				"GET /api/tasks/:id",
				"POST /api/tasks",
				"PUT /api/tasks/:id",
				"DELETE /api/tasks/:id",
			],
		});
	} catch (error) {
		console.error("Health check error:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/api/tasks", (req: Request, res: Response) => {
	try {
		return res.json(tasks);
	} catch (error) {
		console.error("Get tasks error:", error);
		return res.status(500).json({ error: "Failed to fetch tasks" });
	}
});

app.get("/api/tasks/:id", (req: Request<{ id: string }>, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ error: "Task ID is required" });
		}

		const task = tasks.find((t) => t.id === id);
		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}

		return res.json(task);
	} catch (error) {
		console.error("Get task by ID error:", error);
		return res.status(500).json({ error: "Failed to fetch task" });
	}
});

app.post(
	"/api/tasks",
	(req: Request<{}, {}, CreateTaskRequest>, res: Response) => {
		try {
			const { title, description, category, status, priority } = req.body;

			// Validation
			if (!title || !category || !status || !priority) {
				return res.status(400).json({
					error: "Missing required fields",
					message:
						"title, category, status, and priority are required",
				});
			}

			if (typeof title !== "string" || title.trim().length === 0) {
				return res.status(400).json({
					error: "Invalid title",
					message: "Title must be a non-empty string",
				});
			}

			const newTask: Task = {
				id: Date.now().toString(),
				title: title.trim(),
				description: description?.trim() || "",
				category,
				status,
				priority,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			tasks.push(newTask);
			persistTasks();
			return res.status(201).json(newTask);
		} catch (error) {
			console.error("Create task error:", error);
			return res.status(500).json({ error: "Failed to create task" });
		}
	}
);

app.put(
	"/api/tasks/:id",
	(req: Request<{ id: string }, {}, UpdateTaskRequest>, res: Response) => {
		try {
			const { id } = req.params;
			const { title, description, category, status, priority } = req.body;

			if (!id) {
				return res.status(400).json({ error: "Task ID is required" });
			}

			const taskIndex = tasks.findIndex((t) => t.id === id);
			if (taskIndex === -1) {
				return res.status(404).json({ error: "Task not found" });
			}

			const existingTask = tasks[taskIndex];
			if (!existingTask) {
				return res.status(404).json({ error: "Task not found" });
			}

			if (
				title !== undefined &&
				(typeof title !== "string" || title.trim().length === 0)
			) {
				return res.status(400).json({
					error: "Invalid title",
					message: "Title must be a non-empty string",
				});
			}

			const updatedTask: Task = {
				...existingTask,
				title: title ? title.trim() : existingTask.title,
				description:
					description !== undefined
						? description.trim()
						: existingTask.description,
				category: category || existingTask.category,
				status: status || existingTask.status,
				priority: priority || existingTask.priority,
				updatedAt: new Date().toISOString(),
			};

			tasks[taskIndex] = updatedTask;
			persistTasks();
			return res.json(updatedTask);
		} catch (error) {
			console.error("Update task error:", error);
			return res.status(500).json({ error: "Failed to update task" });
		}
	}
);

app.delete("/api/tasks/:id", (req: Request<{ id: string }>, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ error: "Task ID is required" });
		}

		const taskIndex = tasks.findIndex((t) => t.id === id);

		if (taskIndex === -1) {
			return res.status(404).json({ error: "Task not found" });
		}

		tasks.splice(taskIndex, 1);
		persistTasks();
		return res.status(204).send();
	} catch (error) {
		console.error("Delete task error:", error);
		return res.status(500).json({ error: "Failed to delete task" });
	}
});

app.use(errorHandler);

export default app;

// app.listen(3000, () => {
// 	console.log(`Сервер запущен на порту ${3000}`);
// });
