// contexts/ProgressContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    // Carregar progresso do localStorage, se disponível
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedLessons: [],
      scores: {},
      lastActivity: null
    };
  });

  // Salvar progresso no localStorage sempre que for atualizado
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  // Função para marcar uma lição como concluída
  const completeLesson = (lessonId, score) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      scores: {
        ...prev.scores,
        [lessonId]: score
      },
      lastActivity: new Date().toISOString()
    }));
  };

  // Função para verificar se uma lição foi concluída
  const isLessonCompleted = (lessonId) => {
    return progress.completedLessons.includes(lessonId);
  };

  // Função para obter a pontuação de uma lição
  const getLessonScore = (lessonId) => {
    return progress.scores[lessonId] || 0;
  };

  // Função para calcular o progresso geral
  const getOverallProgress = (totalLessons) => {
    return (progress.completedLessons.length / totalLessons) * 100;
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      completeLesson,
      isLessonCompleted,
      getLessonScore,
      getOverallProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

// Hook personalizado para usar o contexto de progresso
export function useProgress() {
  return useContext(ProgressContext);
}