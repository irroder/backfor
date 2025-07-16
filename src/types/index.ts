export interface Task {
	id: string;
	title: string;
	description: string;
	category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
	status: "To Do" | "In Progress" | "Done";
	priority: "Low" | "Medium" | "High";
	createdAt: string;
	updatedAt: string;
}

export interface CreateTaskRequest {
	title: string;
	description?: string;
	category: Task["category"];
	status: Task["status"];
	priority: Task["priority"];
}

export interface UpdateTaskRequest {
	title?: string;
	description?: string;
	category?: Task["category"];
	status?: Task["status"];
	priority?: Task["priority"];
}

export interface ApiError {
	error: string;
	message?: string;
	statusCode?: number;
}
