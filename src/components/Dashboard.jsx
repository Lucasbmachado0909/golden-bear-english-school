// components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProgress } from '../utils/progressTracker';

function Dashboard() {
  const progress = getAllProgress();
  const lessons = [
    { id: 'lesson1', title: 'Pronomes e Verbos' },
    { id: 'lesson2', title: 'Frases Negativas' },
    { id: 'lesson3', title: 'Perguntas' },
    { id: 'lesson4', title: 'Presente Contínuo' },
    { id: 'lesson5', title: 'Vocabulário Temático' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Seu Progresso</h1>
        
        <div className="space-y-6">
          {lessons.map(lesson => (
            <div key={lesson.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{lesson.title}</h3>
                <span className="text-indigo-600 font-bold">
                  {progress[lesson.id] ? `${progress[lesson.id]}%` : 'Não iniciada'}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-indigo-600 h-4 rounded-full" 
                  style={{ width: `${progress[lesson.id] || 0}%` }}
                ></div>
              </div>
              
              <div className="mt-3">
                <Link 
                  to={`/${lesson.id}`} 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {progress[lesson.id] ? 'Continuar lição' : 'Iniciar lição'} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;