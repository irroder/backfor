import { Task } from "../types";
import * as fs from "fs";
import * as path from "path";

const TASKS_FILE_PATH = path.join(__dirname, "tasks-data.json");

// Функция для загрузки задач из файла
function loadTasksFromFile(): Task[] {
	try {
		if (fs.existsSync(TASKS_FILE_PATH)) {
			const data = fs.readFileSync(TASKS_FILE_PATH, "utf8");
			const loadedTasks = JSON.parse(data);
			return loadedTasks;
		}
	} catch (error) {
		console.error("Error loading tasks from file:", error);
	}
	// Если файла нет или произошла ошибка, возвращаем пустой массив
	return [];
}

// Функция для сохранения задач в файл
function saveTasksToFile(tasks: Task[]): void {
	try {
		fs.writeFileSync(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2));
	} catch (error) {
		console.error("Error saving tasks to file:", error);
	}
}

// Используем глобальный массив, который не сбрасывается при каждом импорте
let globalTasks: Task[] | null = null;

function initializeTasks(): Task[] {
	if (globalTasks === null) {
		globalTasks = loadTasksFromFile();
	}
	return globalTasks;
}

export let tasks: Task[] = initializeTasks();

// Функция для сохранения изменений
export function persistTasks(): void {
	saveTasksToFile(tasks);
}
