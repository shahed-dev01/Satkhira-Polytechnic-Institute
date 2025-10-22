import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { z } from "zod";

const routineSchema = z.object({
  semester: z.string().trim().min(1, "Semester is required"),
  day: z.string().trim().min(1, "Day is required"),
  time: z.string().trim().min(1, "Time is required").max(100, "Time too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject too long"),
  teacher: z.string().trim().min(1, "Teacher is required").max(200, "Teacher too long"),
  room: z.string().trim().min(1, "Room is required").max(100, "Room too long"),
});

const RoutineManagement = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    semester: "1st Semester",
    day: "Saturday",
    time: "",
    subject: "",
    teacher: "",
    room: "",
  });

  const semesters = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"];
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  const { data: routine } = useQuery({
    queryKey: ["class_routine"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("class_routine")
        .select("*")
        .order("semester")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("class_routine").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class_routine"] });
      resetForm();
      toast.success("Class added successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from("class_routine").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class_routine"] });
      resetForm();
      toast.success("Class updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("class_routine").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class_routine"] });
      toast.success("Class deleted successfully");
    },
  });

  const resetForm = () => {
    setFormData({
      semester: "1st Semester",
      day: "Saturday",
      time: "",
      subject: "",
      teacher: "",
      room: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setFormData({
      semester: item.semester,
      day: item.day,
      time: item.time,
      subject: item.subject,
      teacher: item.teacher,
      room: item.room,
    });
    setEditingId(item.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = routineSchema.parse(formData);
      const cleanData = {
        semester: validated.semester,
        day: validated.day,
        time: validated.time,
        subject: validated.subject,
        teacher: validated.teacher,
        room: validated.room,
      };
      
      if (editingId) {
        updateMutation.mutate({ id: editingId, data: cleanData });
      } else {
        addMutation.mutate(cleanData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add"} Class</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="semester">Semester *</Label>
                <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="day">Day *</Label>
                <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  placeholder="e.g., 8:00 AM - 9:30 AM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="teacher">Teacher *</Label>
                <Input
                  id="teacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="room">Room *</Label>
                <Input
                  id="room"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update" : "Add"} Class
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {routine?.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                      {item.semester}
                    </span>
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded text-sm">
                      {item.day}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{item.subject}</h3>
                  <p className="text-sm text-muted-foreground">{item.teacher}</p>
                  <div className="text-sm mt-2 space-y-1">
                    <p>Time: {item.time}</p>
                    <p>Room: {item.room}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoutineManagement;
