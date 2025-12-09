'use client'
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Calendar, UserCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTasks, createTask, reorderTasks } from "../services/taskService";
import { getAllProjects } from "../services/projectService";

const initialData = {
    tasks: {},
    columns: {
        'column-1': { id: 'column-1', title: 'To Do', taskIds: [] },
        'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
        'column-3': { id: 'column-3', title: 'Done', taskIds: [] },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default function ProjectBoardPage() {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                const projectsData = await getAllProjects();
                setProjects(projectsData);
                if (projectsData.length > 0) {
                    const firstProject = projectsData[0];
                    setCurrentProject(firstProject);
                    await fetchTasks(firstProject._id);
                }
            } catch (err) {
                console.error("Failed to init board", err);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    const fetchTasks = async (projectId) => {
        try {
            const tasksData = await getTasks(projectId);
            setData(tasksData);
        } catch (err) {
            console.error("Failed to load tasks", err);
        }
    };

    const handleCreateTask = async () => {
        if (!currentProject) return;
        const content = prompt("Enter task content:");
        if (!content) return;

        try {
            await createTask({
                content,
                tag: 'General',
                priority: 'Medium',
                assignee: 'Unassigned',
                projectId: currentProject._id
            });
            fetchTasks(currentProject._id);
        } catch (err) {
            alert("Failed to create task");
        }
    }

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        // Optimistic Update
        let newData;
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };
            newData = {
                ...data,
                columns: { ...data.columns, [newColumn.id]: newColumn },
            };
        } else {
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = { ...start, taskIds: startTaskIds };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = { ...finish, taskIds: finishTaskIds };

            newData = {
                ...data,
                columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish },
            };
        }
        setData(newData);

        // API Call
        try {
            // Need to send the new state (task IDs in destination column + source column)
            await reorderTasks({
                projectId: currentProject._id,
                sourceColumnId: source.droppableId,
                destinationColumnId: destination.droppableId,
                sourceTaskIds: newData.columns[source.droppableId].taskIds,
                destinationTaskIds: newData.columns[destination.droppableId].taskIds
            });
        } catch (err) {
            console.error("Failed to save reorder", err);
            // Ideally revert state here, but skipping for simplicity
        }
    };

    if (loading) return <div className="pt-24 text-center">Loading Board...</div>;
    if (!currentProject) return <div className="pt-24 text-center">No projects found. Please create or join a project first.</div>;

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6 lg:px-12 overflow-x-auto">
            <div className="max-w-[1600px] mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground">Project Board: {currentProject.title}</h1>
                        <p className="text-muted-foreground">{currentProject.description}</p>
                    </div>
                    <div className="flex gap-3">
                        {/* Teammates Avatars Placeholder */}
                        <div className="flex -space-x-2">
                            {currentProject.members && currentProject.members.slice(0, 3).map((m, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold overflow-hidden">
                                    {m.avatar ? <img src={m.avatar} alt="av" /> : (m.name?.[0] || 'U')}
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleCreateTask} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Plus className="w-4 h-4 mr-2" />
                            New Task
                        </Button>
                    </div>
                </div>

                {/* Kanban Board */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex flex-col md:flex-row gap-6 items-start h-full">
                        {data.columnOrder.map((columnId) => {
                            const column = data.columns[columnId];
                            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                            return (
                                <div key={column.id} className="flex-1 min-w-[300px] bg-secondary/30 rounded-xl p-4 border border-border/50">
                                    <div className="flex items-center justify-between mb-4 px-1">
                                        <h3 className="font-bold text-foreground flex items-center gap-2">
                                            {column.title}
                                            <span className="bg-background px-2 py-0.5 rounded-full text-xs text-muted-foreground border border-border">
                                                {tasks.length}
                                            </span>
                                        </h3>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <Droppable droppableId={column.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`space-y-3 min-h-[200px] transition-colors rounded-lg ${snapshot.isDraggingOver ? "bg-primary/5" : ""
                                                    }`}
                                            >
                                                {tasks.map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <Card
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`cursor-grab active:cursor-grabbing border-none shadow-sm hover:shadow-md transition-all ${snapshot.isDragging ? "shadow-xl rotate-2 scale-105" : ""
                                                                    }`}
                                                            >
                                                                <CardContent className="p-4 space-y-3">
                                                                    <div className="flex justify-between items-start">
                                                                        <Badge variant="secondary" className={`
                                      ${task.tag === 'Design' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                                                                                task.tag === 'Backend' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                                                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'}
                                      border-none
                                    `}>
                                                                            {task.tag || 'General'}
                                                                        </Badge>
                                                                        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
                                                                            <MoreHorizontal className="w-3 h-3" />
                                                                        </Button>
                                                                    </div>

                                                                    <p className="font-medium text-sm text-foreground">{task.content}</p>

                                                                    <div className="flex items-center justify-between pt-2">
                                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                            <Calendar className="w-3 h-3" />
                                                                            <span>Today</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' :
                                                                                task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                                                                                }`} title={`Priority: ${task.priority}`} />
                                                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                                                {task.assignee ? task.assignee[0] : 'U'}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                    <Button onClick={handleCreateTask} variant="ghost" className="w-full mt-3 text-muted-foreground hover:text-primary hover:bg-background border border-transparent hover:border-border border-dashed">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Task
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}
