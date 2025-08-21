import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "@/components/TaskCard";
import { 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal,
  ArrowLeft 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { kanbanColumns } from "@/data/mockData";
import { KanbanColumn, Task } from "@/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(kanbanColumns);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const task = sourceColumn.tasks[source.index];

    // Create new columns with updated tasks
    const newColumns = columns.map(column => {
      if (column.id === source.droppableId) {
        const newTasks = [...column.tasks];
        newTasks.splice(source.index, 1);
        return { ...column, tasks: newTasks };
      }
      
      if (column.id === destination.droppableId) {
        const newTasks = [...column.tasks];
        const updatedTask = { ...task, status: column.status };
        newTasks.splice(destination.index, 0, updatedTask);
        return { ...column, tasks: newTasks };
      }
      
      return column;
    });

    setColumns(newColumns);
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const columnColors = {
    'todo': 'kanban-column-todo',
    'progress': 'kanban-column-progress', 
    'review': 'kanban-column-review',
    'done': 'kanban-column-done'
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">E-commerce Platform</h1>
              <p className="text-sm text-muted-foreground">Project Kanban Board</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tasks..." 
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="hero">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 min-w-max">
            {filteredColumns.map((column) => (
              <div key={column.id} className="flex-shrink-0 w-80">
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <Card 
                      className={cn(
                        "h-full shadow-soft transition-smooth",
                        columnColors[column.id as keyof typeof columnColors],
                        snapshot.isDraggingOver && "shadow-glow"
                      )}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{column.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {column.tasks.length}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-3">
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-3 min-h-[200px]"
                        >
                          {column.tasks.map((task, index) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              index={index}
                              onClick={() => {
                                // Handle task click - could open modal
                                console.log('Open task:', task.id);
                              }}
                            />
                          ))}
                          {provided.placeholder}
                          
                          {/* Add Task Button */}
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground hover:bg-background/60 border-dashed border-2 border-muted-foreground/30 h-auto py-3"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add a card
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}