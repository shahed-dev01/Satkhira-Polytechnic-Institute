import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/spi-logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SPI Logo" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-primary">Satkhira Polytechnic Institute</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("faculty")} className="text-foreground hover:text-primary transition-colors">
              Faculty
            </button>
            <button onClick={() => scrollToSection("routine")} className="text-foreground hover:text-primary transition-colors">
              Class Routine
            </button>
            <button onClick={() => scrollToSection("notices")} className="text-foreground hover:text-primary transition-colors">
              Notices
            </button>
            <Button onClick={() => scrollToSection("contact")} variant="default">
              Contact
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("home")} className="text-left text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("faculty")} className="text-left text-foreground hover:text-primary transition-colors">
              Faculty
            </button>
            <button onClick={() => scrollToSection("routine")} className="text-left text-foreground hover:text-primary transition-colors">
              Class Routine
            </button>
            <button onClick={() => scrollToSection("notices")} className="text-left text-foreground hover:text-primary transition-colors">
              Notices
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full">
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
