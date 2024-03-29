import { useEffect, useState } from 'react';

interface HeaderProps {
    toggleDarkMode: () => void;
    darkMode: boolean;
    light?: boolean; // Propiedad light opcional
  }
  

function Header({ toggleDarkMode, darkMode, light }: HeaderProps) {
  const [logoSrc, setLogoSrc] = useState('');

  useEffect(() => {
    // Carga de la imagen en el estado una vez que el componente se ha montado
    const loadImage = async () => {
      try {
        const response = await fetch('/alonso-3.svg'); // Ruta de tu imagen
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setLogoSrc(url);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    };

    loadImage();

    // Limpia la URL de la imagen cuando el componente se desmonta
    return () => URL.revokeObjectURL(logoSrc);
  }, [logoSrc]);

  return (
    <header className={`text-${darkMode ? 'gray' : light ? 'teal' : 'teal'}-800 body-font bg-${darkMode ? 'black' : light ? 'black' : 'white'}`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center  text-teal-600 mb-4 md:mb-0 " >
          {logoSrc && <img className="w-10 h-10 rounded-full" src={logoSrc} alt="Logo" />}
          <span className={`ml-3 text-xl ${darkMode ? 'text-blue' : ''}`}>Calculadora de propinas</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

        </nav>
        <button className={`inline-flex items-center bg-${darkMode ? 'white' : light ? 'gray-100' : 'gray-100'} border-0 py-1 px-3 focus:outline-none hover:bg-${darkMode ? 'gray-200' : 'gray-200'} rounded text-base mt-4 md:mt-0`} onClick={toggleDarkMode}>
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>
    </header>
  );
}

export default Header;
