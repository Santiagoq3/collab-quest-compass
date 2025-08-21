import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MessageCircle, 
  Paperclip, 
  MoreHorizontal,
  Flag
} from "lucide-react";
import { Task } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  index: number;
  onClick?: () => void;
}

export function TaskCard({ task, index, onClick }: TaskCardProps) {
  const priorityColors = {
    High: "text-danger",
    Medium: "text-warning", 
    Low: "text-success"
  };

  const priorityBadgeColors = {
    High: "bg-danger/10 text-danger border-danger/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    Low: "bg-success/10 text-success border-success/20"
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "p-4 cursor-pointer hover:shadow-medium transition-smooth bg-card/50 backdrop-blur-sm",
            snapshot.isDragging && "rotate-2 shadow-large"
          )}
          onClick={onClick}
        >
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
              <div className="flex items-center gap-1">
                <Flag className={cn("h-3 w-3", priorityColors[task.priority])} />
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {task.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    +{task.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Priority Badge */}
            <div className="flex items-center justify-between">
              <Badge 
                className={cn("text-xs border", priorityBadgeColors[task.priority])}
                variant="outline"
              >
                {task.priority}
              </Badge>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                {task.comments && task.comments.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{task.comments.length}</span>
                  </div>
                )}
                
                {task.attachments && task.attachments.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-3 w-3" />
                    <span>{task.attachments.length}</span>
                  </div>
                )}
              </div>

              {/* Assignee */}
              {task.assignee && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback className="text-xs">
                    {task.assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </Card>
      )}
    </Draggable>
  );
}