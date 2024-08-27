import React from 'react';
import './styles/footer.css'; // Ruta correcta si footer.css está en src/components/styles


const footerClass = "bg-background text-muted-foreground py-4";
const linkClass = "text-muted-foreground hover:text-primary";

const Footer = () => {
    return (
        <footer className={footerClass}>
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm">Copyright © Gimnasio 2024</p>
                <div className="flex space-x-4">
                    <FooterLink href="#" text="Facebook" />
                    <FooterLink href="#" text="Instagram" />
                    <FooterLink href="#" text="X" />
                    <FooterLink href="#" text="LinkedIn" />
                    <FooterLink href="#" text="YouTube" />
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, text }) => {
    return (
        <a href={href} className={linkClass}>{text}</a>
    );
};

export default Footer;
