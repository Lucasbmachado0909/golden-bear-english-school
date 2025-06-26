// components/BasicEnglishLesson.js
import React, { useState } from 'react';
import InteractiveExercises from './InteractiveExercises'; // Importe o componente

function BasicEnglishLesson() {
  // Estado para controlar as respostas do usuário na atividade
  const [answers, setAnswers] = useState(['', '', '', '', '']);
  const [showFeedback, setShowFeedback] = useState(false);
  const correctAnswers = ['I', 'He', 'They', 'She', 'We'];
  
  // Estado para controlar a visibilidade dos exercícios interativos
  const [showInteractiveExercises, setShowInteractiveExercises] = useState(false);

  // Função para verificar as respostas
  const checkAnswers = () => {
    setShowFeedback(true);
    window.scrollTo({
      top: document.getElementById('activity-feedback').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Função para atualizar as respostas
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Função para calcular a pontuação
  const calculateScore = () => {
    return answers.filter((answer, index) => 
      answer.trim().toLowerCase() === correctAnswers[index].toLowerCase()
    ).length;
  };

  // Função para mostrar/ocultar exercícios interativos
  const toggleInteractiveExercises = () => {
    setShowInteractiveExercises(!showInteractiveExercises);
    if (!showInteractiveExercises) {
      // Se estamos abrindo os exercícios, role até eles
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('interactive-exercises').offsetTop - 50,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Container principal para o conteúdo da aula */}
      <div className="max-w-4xl w-full mx-auto bg-white shadow-2xl rounded-xl p-8 sm:p-10 lg:p-12 my-8">
        {/* Título da Aula */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-10 leading-tight">
          Aula 1: Pronomes Sujeito + Verbos de Ação (Afirmativa)
        </h1>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-10">
          <div className="bg-blue-600 h-4 rounded-full w-1/5"></div>
          <p className="text-right text-sm text-gray-600 mt-1">Aula 1 de 5</p>
        </div>

        {/* 1. Pronomes Sujeito */}
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
            1. Pronomes Sujeito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside space-y-3 text-lg sm:text-xl text-gray-700 ml-5">
              <li><span className="font-semibold text-gray-800">I</span> - eu</li>
              <li><span className="font-semibold text-gray-800">You</span> - você</li>
              <li><span className="font-semibold text-gray-800">He</span> - ele</li>
              <li><span className="font-semibold text-gray-800">She</span> - ela</li>
              <li><span className="font-semibold text-gray-800">It</span> - ele/ela (para coisas e animais)</li>
              <li><span className="font-semibold text-gray-800">We</span> - nós</li>
              <li><span className="font-semibold text-gray-800">They</span> - eles/elas</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">Dica:</h3>
              <p className="text-gray-700">
                Em inglês, os pronomes sujeito são sempre usados antes dos verbos para indicar quem está realizando a ação.
              </p>
              <p className="text-gray-700 mt-2">
                Diferente do português, em inglês não podemos omitir o pronome sujeito!
              </p>
            </div>
          </div>
        </section>

        {/* 2. Verbos de Ação (forma base) */}
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
            2. Verbos de Ação (forma base)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="list-disc list-inside space-y-3 text-lg sm:text-xl text-gray-700 ml-5">
              <li><span className="font-semibold text-gray-800">play</span> - jogar/brincar</li>
              <li><span className="font-semibold text-gray-800">eat</span> - comer</li>
              <li><span className="font-semibold text-gray-800">drink</span> - beber</li>
              <li><span className="font-semibold text-gray-800">work</span> - trabalhar</li>
              <li><span className="font-semibold text-gray-800">study</span> - estudar</li>
              <li><span className="font-semibold text-gray-800">like</span> - gostar</li>
              <li><span className="font-semibold text-gray-800">go</span> - ir</li>
            </ul>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-800 mb-2">Áudio:</h3>
              <p className="text-gray-700 mb-3">
                Escute a pronúncia dos verbos:
              </p>
              <div className="flex flex-wrap gap-2">
                {['play', 'eat', 'drink', 'work', 'study', 'like', 'go'].map((verb) => (
                  <button 
                    key={verb}
                    className="bg-white text-green-700 border border-green-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    {verb}
                    <span className="ml-1">🔊</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Estrutura de Frase Afirmativa */}
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
            3. Estrutura de Frase Afirmativa
          </h2>
          <div className="flex flex-col items-center mb-6">
            <p className="text-xl sm:text-2xl text-gray-800 font-medium mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md">
                [Pronome]
              </span>
              <span className="mx-3 text-2xl font-bold">+</span>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md">
                [verbo na forma base]
              </span>
            </p>
            <div className="w-full max-w-md bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-yellow-800">
                <span className="font-bold">Atenção:</span> Para a 3ª pessoa do singular (he, she, it), 
                adicionamos <span className="font-bold">-s</span> ou <span className="font-bold">-es</span> ao verbo.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Exemplos:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                <p className="font-mono text-green-700 text-xl mb-2">I play soccer.</p>
                <p className="text-gray-600 italic">Eu jogo futebol.</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                <p className="font-mono text-green-700 text-xl mb-2">She eats breakfast.</p>
                <p className="text-gray-600 italic">Ela come café da manhã.</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                <p className="font-mono text-green-700 text-xl mb-2">They work together.</p>
                <p className="text-gray-600 italic">Eles trabalham juntos.</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                <p className="font-mono text-green-700 text-xl mb-2">We study English.</p>
                <p className="text-gray-600 italic">Nós estudamos inglês.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Atividade: Complete as frases */}
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
            4. Atividade: Complete as frases
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Complete com o pronome correto:
          </p>
          <div className="space-y-4">
            {[
              'eat pizza.',
              'works at a school.',
              'like music.',
              'plays with the dog.',
              'go to the park.'
            ].map((phrase, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-2 w-20">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="?"
                  />
                </div>
                <p className="text-xl sm:text-2xl font-medium text-gray-800">{phrase}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={checkAnswers}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Verificar Respostas
            </button>
          </div>

          {/* Feedback da Atividade */}
          {showFeedback && (
            <div id="activity-feedback" className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Resultado:</h3>
              <p className="text-xl mb-4">
                Você acertou <span className="font-bold text-blue-700">{calculateScore()}</span> de 5 questões!
              </p>
              <div className="space-y-3">
                {answers.map((answer, index) => {
                  const isCorrect = answer.trim().toLowerCase() === correctAnswers[index].toLowerCase();
                  return (
                    <div key={index} className={`p-3 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                      <p className="flex items-center">
                        <span className={`mr-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <span className="font-medium">
                          {isCorrect 
                            ? `Correto! "${correctAnswers[index]}" é o pronome correto.` 
                            : `Incorreto. O pronome correto é "${correctAnswers[index]}".`}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* 5. Tarefa Final */}
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
            5. Tarefa Final
          </h2>
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Para praticar:</h3>
            <ul className="list-decimal list-inside space-y-4 text-lg sm:text-xl text-gray-700 ml-5">
              <li>Grave um áudio dizendo 5 frases com pronomes e verbos.</li>
              <li>Escreva 3 frases com "I", "He" e "They".</li>
            </ul>
            <div className="mt-6">
              <div className="mb-4">
                <label htmlFor="audio-upload" className="block text-lg font-medium text-gray-700 mb-2">
                  Enviar áudio:
                </label>
                <div className="flex items-center">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors">
                    <span className="mr-2">🎤</span> Gravar Áudio
                  </button>
                  <span className="ml-4 text-gray-500">ou</span>
                  <label className="ml-4 cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                    <span className="text-indigo-600">Fazer upload</span>
                    <input id="audio-upload" type="file" accept="audio/*" className="hidden" />
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="sentences" className="block text-lg font-medium text-gray-700 mb-2">
                  Suas frases:
                </label>
                <textarea
                  id="sentences"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Digite suas frases aqui..."
                ></textarea>
                <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors">
                  Enviar Tarefa
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Exercícios Interativos - Botão para mostrar/ocultar */}
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
            6. Exercícios Interativos
          </h2>
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6">
              Pratique o que aprendeu com exercícios interativos de arrastar e soltar, múltipla escolha e preenchimento de lacunas.
            </p>
            <button
              onClick={toggleInteractiveExercises}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
            >
              {showInteractiveExercises ? 'Ocultar Exercícios' : 'Mostrar Exercícios Interativos'}
            </button>
          </div>
        </section>

        {/* Componente InteractiveExercises */}
        {showInteractiveExercises && (
          <div id="interactive-exercises" className="mb-10">
            <InteractiveExercises />
          </div>
        )}

        {/* Navegação entre aulas */}
        <div className="mt-12 flex justify-between">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg opacity-50 cursor-not-allowed">
            ← Aula Anterior
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
            Próxima Aula →
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicEnglishLesson;