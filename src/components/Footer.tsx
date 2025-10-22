import logo from "@/assets/spi-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SPI Logo" className="h-8 w-8 object-contain" />
            <span className="font-bold text-lg">Satkhira Polytechnic Institute</span>
          </div>
          <p className="text-sm text-primary-foreground/80">
            © 2025 Satkhira Polytechnic Institute. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="https://www.facebook.com/shahed.rahman11270050" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
  Developed by: Shahed Rahman</a>
  <a href="https://github.com/shahed-dev01" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
  Github: Shahed Rahman</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
