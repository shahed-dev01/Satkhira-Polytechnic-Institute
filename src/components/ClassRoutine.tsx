import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin } from "lucide-react";

const ClassRoutine = () => {
  const [selectedSemester, setSelectedSemester] = useState("1st Semester");

  const { data: routineData, isLoading } = useQuery({
    queryKey: ["class_routine"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("class_routine")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      
      // Group by semester
      const grouped = data.reduce((acc: any, item: any) => {
        if (!acc[item.semester]) {
          acc[item.semester] = [];
        }
        acc[item.semester].push(item);
        return acc;
      }, {});
      
      return grouped;
    },
  });

  const semesters = routineData ? Object.keys(routineData).sort() : ["1st Semester", "2nd Semester", "3rd Semester"];

  return (
    <section id="routine" className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Class Routine</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check your semester-wise class schedules and stay organized
          </p>
        </div>

        <Tabs defaultValue="1st Semester" className="w-full" onValueChange={setSelectedSemester}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            {semesters.slice(0, 3).map((semester) => (
              <TabsTrigger key={semester} value={semester}>{semester}</TabsTrigger>
            ))}
          </TabsList>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full" />
              ))}
            </div>
          ) : (
            semesters.map((semester) => (
              <TabsContent key={semester} value={semester} className="space-y-4">
                <div className="grid gap-4">
                  {routineData?.[semester]?.map((classItem: any) => (
                    <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-foreground">{classItem.subject}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{classItem.teacher}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                              {classItem.day}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-accent" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))
          )}
        </Tabs>
      </div>
    </section>
  );
};

export default ClassRoutine;
