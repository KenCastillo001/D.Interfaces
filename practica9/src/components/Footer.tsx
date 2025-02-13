import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from "../components/boton"; // Asegúrate de que la ruta sea correcta

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-xl font-bold">ACADEMIAE</div>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="X (Twitter)">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Gmail">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Academiae. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
