import { Mail, Phone, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface FacultyCardProps {
  name: string;
  designation: string;
  department: string;
  education: string;
  email: string;
  phone: string;
  image?: string;
}

const FacultyCard = ({ name, designation, department, education, email, phone, image }: FacultyCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
      <CardHeader className="text-center pb-4">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        <p className="text-primary font-medium">{designation}</p>
        <Badge variant="secondary" className="mt-2">
          {department}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2 text-sm">
          <GraduationCap className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <span className="text-muted-foreground">{education}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-primary flex-shrink-0" />
          <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors truncate">
            {email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-primary flex-shrink-0" />
          <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors">
            {phone}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyCard;
