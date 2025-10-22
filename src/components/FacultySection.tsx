import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import FacultyCard from "./FacultyCard";
import { Skeleton } from "@/components/ui/skeleton";

const FacultySection = () => {
  const { data: facultyData, isLoading } = useQuery({
    queryKey: ["faculty"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="faculty" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Distinguished Faculty</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our world-class educators dedicated to nurturing excellence and innovation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full" />
              </div>
            ))
          ) : (
            facultyData?.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                name={faculty.name}
                designation={faculty.designation}
                department={faculty.department}
                education={faculty.education}
                email={faculty.email}
                phone={faculty.phone}
                image={faculty.image_url || undefined}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
