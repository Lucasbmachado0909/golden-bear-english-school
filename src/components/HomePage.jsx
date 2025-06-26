// components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">Golden Bear English School</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#courses" className="text-gray-600 hover:text-indigo-600">Cursos</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-indigo-600">Sobre</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-indigo-600">Contato</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Aprenda inglês de forma interativa</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Aulas dinâmicas, exercícios interativos e acompanhamento personalizado para você dominar o inglês.
          </p>
          <Link to="/lesson1" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors">
            Começar agora
          </Link>
        </section>

        {/* Course Section */}
        <section id="courses" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nossas Lições</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Lesson Card 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 h-2"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lição 1: Pronomes e Verbos</h3>
                  <p className="text-gray-600 mb-4">Aprenda os pronomes pessoais e verbos básicos em inglês.</p>
                  <Link to="/lesson1" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Iniciar lição →
                  </Link>
                </div>
              </div>
              
              {/* Lesson Card 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 h-2"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lição 2: Frases Negativas</h3>
                  <p className="text-gray-600 mb-4">Aprenda a formar frases negativas com "don't" e "doesn't".</p>
                  <Link to="/lesson2" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Iniciar lição →
                  </Link>
                </div>
              </div>
              
              {/* Lesson Card 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 h-2"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lição 3: Perguntas</h3>
                  <p className="text-gray-600 mb-4">Aprenda a fazer perguntas com "do" e "does".</p>
                  <Link to="/lesson3" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Em breve →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16 bg-gray-50">
          {/* Conteúdo sobre a escola */}
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
          {/* Formulário de contato */}
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">© 2025 Golden Bear English School. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;