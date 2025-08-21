import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users,
  FolderKanban,
  Plus
} from "lucide-react";
import { mockProjects, mockTasks, mockUsers } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const activeProjects = mockProjects.filter(p => p.status === 'Active');
  const myTasks = mockTasks.filter(t => t.assignee?.id === mockUsers[0].id);
  const overdueTasks = mockTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date());

  const stats = [
    {
      title: "Active Projects",
      value: activeProjects.length,
      icon: FolderKanban,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "My Tasks",
      value: myTasks.length,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      title: "Overdue",
      value: overdueTasks.length,
      icon: AlertCircle,
      color: "text-danger",
      bg: "bg-danger/10"
    },
    {
      title: "Team Members",
      value: mockUsers.filter(u => u.isActive).length,
      icon: Users,
      color: "text-warning",
      bg: "bg-warning/10"
    }
  ];

  const priorityColors = {
    High: "bg-danger text-danger-foreground",
    Medium: "bg-warning text-warning-foreground",
    Low: "bg-success text-success-foreground"
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {mockUsers[0].name}. Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Clock className="h-4 w-4" />
            View Calendar
          </Button>
          <Button variant="hero">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Active Projects</span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/projects">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-fast">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge variant="secondary" className="text-xs">{project.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
                <div className="ml-6 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium">+{project.members.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Tasks */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>My Tasks</span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tasks">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-fast cursor-pointer">
                <div className="flex-1">
                  <h5 className="font-medium text-sm mb-1">{task.title}</h5>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                    >
                      {task.priority}
                    </Badge>
                    {task.dueDate && (
                      <span className="text-xs text-muted-foreground">
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}