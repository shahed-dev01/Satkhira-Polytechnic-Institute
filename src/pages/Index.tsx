import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FacultySection from "@/components/FacultySection";
import ClassRoutine from "@/components/ClassRoutine";
import NoticeBoard from "@/components/NoticeBoard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FacultySection />
      <ClassRoutine />
      <NoticeBoard />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
