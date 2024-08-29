<<<<<<< HEAD
import faceLogo from '/facebook.svg'
import instaLogo from '/instagram.svg'
import linkedLogo from '/linkedin.svg'
import xLogo from '/x.svg'
import youtuLogo from '/youtube.svg'


export default function Footer(){
    return(
        <footer className="h-[6vh] flex justify-between bg-black">
            <div className="flex items-center ml-4">
                <h1>Copiryght © Gimnasio 2024</h1>
            </div>
            <div className='flex items-center gap-4 mr-4'>
                <img src={faceLogo} className="logo facebook" alt="Facebook logo" />
                <img src={instaLogo} className="logo instagram" alt="Instagram logo" />
                <img src={linkedLogo} className="logo linkedin" alt="Linkedin logo" />
                <img src={xLogo} className="logo x" alt="X logo" />
                <img src={youtuLogo} className="logo youtube" alt="Youtube logo" />

            </div>
        </footer>
    )
}
=======
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
>>>>>>> origin/s3-mf-manager/HU-TP-67
