import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  User,
  Flag,
  Paperclip,
  MessageCircle,
  Edit3,
  Save,
  X,
  Send
} from "lucide-react";
import { Task, User as UserType } from "@/types";
import { mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (task: Task) => void;
}

export function TaskDetailModal({ task, isOpen, onClose, onSave }: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const [newComment, setNewComment] = useState("");

  if (!task) return null;

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

  const statusColors = {
    "Todo": "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-primary/10 text-primary border-primary/20",
    "In Review": "bg-warning/10 text-warning border-warning/20",
    "Done": "bg-success/10 text-success border-success/20"
  };

  const handleSave = () => {
    if (editedTask && onSave) {
      onSave(editedTask);
    }
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Here you would typically save the comment to your backend
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editedTask?.title || ""}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="text-lg font-semibold"
              />
            ) : (
              <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
            )}
            <DialogDescription className="flex items-center gap-2 mt-2">
              <Badge className={cn("text-xs border", statusColors[task.status])}>
                {task.status}
              </Badge>
              <Badge className={cn("text-xs border", priorityBadgeColors[task.priority])}>
                <Flag className={cn("h-3 w-3 mr-1", priorityColors[task.priority])} />
                {task.priority}
              </Badge>
            </DialogDescription>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm" variant="success">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              {isEditing ? (
                <Textarea
                  value={editedTask?.description || ""}
                  onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="min-h-[100px]"
                  placeholder="Add a description..."
                />
              ) : (
                <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                  {task.description || "No description provided"}
                </div>
              )}
            </div>

            {/* Attachments */}
            {task.attachments && task.attachments.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Attachments ({task.attachments.length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {task.attachments.map((attachment) => (
                    <Card key={attachment.id} className="p-3">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate">{attachment.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Comments ({task.comments.length})
              </h3>
              
              {/* Add Comment */}
              <div className="flex gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUsers[0].avatar} />
                  <AvatarFallback>{mockUsers[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <Button onClick={handleAddComment} size="sm" disabled={!newComment.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Task Info */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Task Details</h3>
              <div className="space-y-3">
                {/* Assignee */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Assignee
                  </span>
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due Date
                  </span>
                  <span className="text-sm">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                  </span>
                </div>

                {/* Created */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Created
                  </span>
                  <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Updated */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Updated
                  </span>
                  <span className="text-sm">{new Date(task.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <Card className="p-4">
                <h3 className="font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Watchers */}
            {task.watchers && task.watchers.length > 0 && (
              <Card className="p-4">
                <h3 className="font-medium mb-3">Watchers</h3>
                <div className="space-y-2">
                  {task.watchers.map((watcher) => (
                    <div key={watcher.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={watcher.avatar} />
                        <AvatarFallback className="text-xs">
                          {watcher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{watcher.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}