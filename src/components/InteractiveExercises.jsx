// components/InteractiveExercises.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function InteractiveExercises() {
  // Estados para os diferentes exercícios
  const [dragDropItems, setDragDropItems] = useState({
    pronouns: [
      { id: 'pronoun-1', content: 'I' },
      { id: 'pronoun-2', content: 'You' },
      { id: 'pronoun-3', content: 'He' },
      { id: 'pronoun-4', content: 'She' },
      { id: 'pronoun-5', content: 'It' },
      { id: 'pronoun-6', content: 'We' },
      { id: 'pronoun-7', content: 'They' }
    ],
    verbs: [
      { id: 'verb-1', content: 'play' },
      { id: 'verb-2', content: 'eat' },
      { id: 'verb-3', content: 'drink' },
      { id: 'verb-4', content: 'work' },
      { id: 'verb-5', content: 'study' },
      { id: 'verb-6', content: 'like' },
      { id: 'verb-7', content: 'go' }
    ],
    sentences: []
  });
  
  const [dragDropFeedback, setDragDropFeedback] = useState(null);
  
  // Estado para o exercício de múltipla escolha
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });
  
  const [multipleChoiceFeedback, setMultipleChoiceFeedback] = useState(null);
  
  // Estado para o exercício de preenchimento de lacunas
  const [fillInBlanks, setFillInBlanks] = useState(['', '', '', '']);
  const [fillInBlanksFeedback, setFillInBlanksFeedback] = useState(null);
  
  // Função para lidar com o arrastar e soltar
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // Descartar se não houver destino ou se o destino for o mesmo que a origem
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }
    
    // Lógica para mover itens entre listas
    const sourceList = [...dragDropItems[source.droppableId]];
    const destList = source.droppableId === destination.droppableId 
      ? sourceList 
      : [...dragDropItems[destination.droppableId]];
    
    // Remover da lista de origem
    const [removed] = sourceList.splice(source.index, 1);
    
    // Adicionar à lista de destino
    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, removed);
      setDragDropItems({
        ...dragDropItems,
        [source.droppableId]: sourceList
      });
    } else {
      // Se estamos movendo para a lista de sentenças, vamos criar uma sentença
      if (destination.droppableId === 'sentences') {
        // Verificar se já existe um pronome e um verbo
        const existingPronouns = destList.filter(item => item.id.includes('pronoun'));
        const existingVerbs = destList.filter(item => item.id.includes('verb'));
        
        // Se já temos um pronome e estamos adicionando outro, ou
        // se já temos um verbo e estamos adicionando outro, não permitir
        if ((removed.id.includes('pronoun') && existingPronouns.length > 0) ||
            (removed.id.includes('verb') && existingVerbs.length > 0)) {
          return;
        }
        
        destList.splice(destination.index, 0, removed);
      } else {
        destList.splice(destination.index, 0, removed);
      }
      
      setDragDropItems({
        ...dragDropItems,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList
      });
    }
  };
  
  // Função para verificar as sentenças formadas
  const checkSentences = () => {
    const sentences = dragDropItems.sentences;
    
    if (sentences.length === 0) {
      setDragDropFeedback({
        type: 'warning',
        message: 'Você precisa formar pelo menos uma sentença!'
      });
      return;
    }
    
    // Verificar se cada sentença tem um pronome e um verbo
    const pronouns = sentences.filter(s => s.id.includes('pronoun'));
    const verbs = sentences.filter(s => s.id.includes('verb'));
    
    if (pronouns.length === 0 || verbs.length === 0) {
      setDragDropFeedback({
        type: 'error',
        message: 'Cada sentença precisa ter um pronome e um verbo!'
      });
    } else {
      setDragDropFeedback({
        type: 'success',
        message: `Você formou uma sentença válida!`,
        sentences: sentences.map(item => item.content).join(' ')
      });
    }
  };
  
  // Função para limpar as sentenças
  const clearSentences = () => {
    // Devolver os itens para suas listas originais
    const pronounsToReturn = dragDropItems.sentences.filter(item => item.id.includes('pronoun'));
    const verbsToReturn = dragDropItems.sentences.filter(item => item.id.includes('verb'));
    
    setDragDropItems({
      pronouns: [...dragDropItems.pronouns, ...pronounsToReturn],
      verbs: [...dragDropItems.verbs, ...verbsToReturn],
      sentences: []
    });
    
    setDragDropFeedback(null);
  };
  
  // Função para verificar as respostas de múltipla escolha
  const checkMultipleChoice = () => {
    const correctAnswers = {
      q1: 'b', // "She plays soccer"
      q2: 'a', // "They work"
      q3: 'c', // "I eat breakfast"
      q4: 'b'  // "He studies English"
    };
    
    let score = 0;
    const results = {};
    
    Object.keys(multipleChoiceAnswers).forEach(question => {
      const isCorrect = multipleChoiceAnswers[question] === correctAnswers[question];
      results[question] = isCorrect;
      if (isCorrect) score++;
    });
    
    setMultipleChoiceFeedback({
      score,
      total: Object.keys(correctAnswers).length,
      results
    });
  };
  
  // Função para verificar as respostas de preenchimento de lacunas
  const checkFillInBlanks = () => {
    const correctAnswers = ['They', 'She', 'I', 'We'];
    
    let score = 0;
    const results = fillInBlanks.map((answer, index) => {
      const isCorrect = answer.trim().toLowerCase() === correctAnswers[index].toLowerCase();
      if (isCorrect) score++;
      return {
        userAnswer: answer,
        correctAnswer: correctAnswers[index],
        isCorrect
      };
    });
    
    setFillInBlanksFeedback({
      score,
      total: correctAnswers.length,
      results
    });
  };
  
  return (
    <div className="space-y-12">
      {/* Exercício 1: Arrastar e Soltar */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Exercício 1: Forme Sentenças</h2>
        <p className="text-gray-700 mb-6">
          Arraste um pronome e um verbo para formar uma sentença válida.
        </p>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lista de Pronomes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Pronomes:</h3>
              <Droppable droppableId="pronouns">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-blue-50 p-4 rounded-lg min-h-[200px]"
                  >
                    {dragDropItems.pronouns.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-blue-100 border border-blue-300 rounded-md p-3 mb-2 text-blue-800 font-medium cursor-move"
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            
            {/* Lista de Verbos */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Verbos:</h3>
              <Droppable droppableId="verbs">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-green-50 p-4 rounded-lg min-h-[200px]"
                  >
                    {dragDropItems.verbs.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-green-100 border border-green-300 rounded-md p-3 mb-2 text-green-800 font-medium cursor-move"
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            
            {/* Área de Sentenças */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Sua Sentença:</h3>
              <Droppable droppableId="sentences">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-purple-50 p-4 rounded-lg min-h-[200px] border-2 border-dashed border-purple-300 flex flex-wrap items-center"
                  >
                    {dragDropItems.sentences.length === 0 ? (
                      <p className="text-purple-400 text-center w-full">
                        Arraste um pronome e um verbo para cá
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {dragDropItems.sentences.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`rounded-md p-3 font-medium cursor-move ${
                                  item.id.includes('pronoun') 
                                    ? 'bg-blue-100 border border-blue-300 text-blue-800' 
                                    : 'bg-green-100 border border-green-300 text-green-800'
                                }`}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={checkSentences}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Verificar Sentença
                </button>
                <button
                  onClick={clearSentences}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
          
          {/* Feedback para o exercício de arrastar e soltar */}
          {dragDropFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${
              dragDropFeedback.type === 'success' ? 'bg-green-100 text-green-800' :
              dragDropFeedback.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <p className="font-medium">{dragDropFeedback.message}</p>
              {dragDropFeedback.type === 'success' && (
                <div className="mt-3 p-3 bg-white rounded-md">
                  <p className="font-mono text-lg">
                    {dragDropItems.sentences.map(item => item.content).join(' ')}
                    {dragDropItems.sentences.length > 0 && '.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </DragDropContext>
      </section>
      
      {/* Exercício 2: Múltipla Escolha */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Exercício 2: Múltipla Escolha</h2>
        <p className="text-gray-700 mb-6">
          Escolha a opção correta para cada pergunta.
        </p>
        
        <div className="space-y-6">
          {/* Questão 1 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800 mb-3">1. Qual é a forma correta?</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q1"
                  value="a"
                  checked={multipleChoiceAnswers.q1 === 'a'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q1: 'a'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>She play soccer</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q1"
                  value="b"
                  checked={multipleChoiceAnswers.q1 === 'b'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q1: 'b'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>She plays soccer</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q1"
                  value="c"
                  checked={multipleChoiceAnswers.q1 === 'c'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q1: 'c'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>Her plays soccer</span>
              </label>
            </div>
            
            {multipleChoiceFeedback && (
              <div className={`mt-3 p-2 rounded ${
                multipleChoiceFeedback.results.q1 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <p className={multipleChoiceFeedback.results.q1 ? 'text-green-800' : 'text-red-800'}>
                  {multipleChoiceFeedback.results.q1 ? '✓ Correto!' : '✗ Incorreto. A resposta correta é: "She plays soccer"'}
                </p>
              </div>
            )}
          </div>
          
          {/* Questão 2 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800 mb-3">2. Qual é a forma correta?</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q2"
                  value="a"
                  checked={multipleChoiceAnswers.q2 === 'a'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q2: 'a'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>They work</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q2"
                  value="b"
                  checked={multipleChoiceAnswers.q2 === 'b'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q2: 'b'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>They works</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q2"
                  value="c"
                  checked={multipleChoiceAnswers.q2 === 'c'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q2: 'c'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>Them work</span>
              </label>
            </div>
            
            {multipleChoiceFeedback && (
              <div className={`mt-3 p-2 rounded ${
                multipleChoiceFeedback.results.q2 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <p className={multipleChoiceFeedback.results.q2 ? 'text-green-800' : 'text-red-800'}>
                  {multipleChoiceFeedback.results.q2 ? '✓ Correto!' : '✗ Incorreto. A resposta correta é: "They work"'}
                </p>
              </div>
            )}
          </div>
          
          {/* Questão 3 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800 mb-3">3. Qual é a forma correta?</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q3"
                  value="a"
                  checked={multipleChoiceAnswers.q3 === 'a'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q3: 'a'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>Me eat breakfast</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q3"
                  value="b"
                  checked={multipleChoiceAnswers.q3 === 'b'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q3: 'b'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>I eats breakfast</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q3"
                  value="c"
                  checked={multipleChoiceAnswers.q3 === 'c'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q3: 'c'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>I eat breakfast</span>
              </label>
            </div>
            
            {multipleChoiceFeedback && (
              <div className={`mt-3 p-2 rounded ${
                multipleChoiceFeedback.results.q3 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <p className={multipleChoiceFeedback.results.q3 ? 'text-green-800' : 'text-red-800'}>
                  {multipleChoiceFeedback.results.q3 ? '✓ Correto!' : '✗ Incorreto. A resposta correta é: "I eat breakfast"'}
                </p>
              </div>
            )}
          </div>
          
          {/* Questão 4 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800 mb-3">4. Qual é a forma correta?</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q4"
                  value="a"
                  checked={multipleChoiceAnswers.q4 === 'a'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q4: 'a'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>He study English</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q4"
                  value="b"
                  checked={multipleChoiceAnswers.q4 === 'b'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q4: 'b'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>He studies English</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="q4"
                  value="c"
                  checked={multipleChoiceAnswers.q4 === 'c'}
                  onChange={() => setMultipleChoiceAnswers({...multipleChoiceAnswers, q4: 'c'})}
                  className="h-5 w-5 text-indigo-600"
                />
                <span>Him studies English</span>
              </label>
            </div>
            
            {multipleChoiceFeedback && (
              <div className={`mt-3 p-2 rounded ${
                multipleChoiceFeedback.results.q4 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <p className={multipleChoiceFeedback.results.q4 ? 'text-green-800' : 'text-red-800'}>
                  {multipleChoiceFeedback.results.q4 ? '✓ Correto!' : '✗ Incorreto. A resposta correta é: "He studies English"'}
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={checkMultipleChoice}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Verificar Respostas
          </button>
          
          {multipleChoiceFeedback && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Resultado:</h3>
              <p className="text-lg">
                Você acertou <span className="font-bold text-indigo-700">{multipleChoiceFeedback.score}</span> de {multipleChoiceFeedback.total} questões!
              </p>
              {multipleChoiceFeedback.score === multipleChoiceFeedback.total ? (
                <p className="mt-2 text-green-600 font-medium">Parabéns! Você dominou este exercício!</p>
              ) : (
                <p className="mt-2 text-indigo-600">Revise as questões incorretas e tente novamente!</p>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Exercício 3: Preenchimento de Lacunas */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Exercício 3: Preenchimento de Lacunas</h2>
        <p className="text-gray-700 mb-6">
          Complete as frases com o pronome correto (I, You, He, She, It, We, They).
        </p>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg mb-6">Complete as frases abaixo:</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={fillInBlanks[0]}
                  onChange={(e) => {
                    const newFillInBlanks = [...fillInBlanks];
                    newFillInBlanks[0] = e.target.value;
                    setFillInBlanks(newFillInBlanks);
                  }}
                  className="w-20 p-2 border border-gray-300 rounded-md mr-3 text-center"
                  placeholder="?"
                />
                <span className="text-lg"> go to school every day.</span>
                
                {fillInBlanksFeedback && (
                  <span className={`ml-3 ${
                    fillInBlanksFeedback.results[0].isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {fillInBlanksFeedback.results[0].isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={fillInBlanks[1]}
                  onChange={(e) => {
                    const newFillInBlanks = [...fillInBlanks];
                    newFillInBlanks[1] = e.target.value;
                    setFillInBlanks(newFillInBlanks);
                  }}
                  className="w-20 p-2 border border-gray-300 rounded-md mr-3 text-center"
                  placeholder="?"
                />
                <span className="text-lg"> likes to read books.</span>
                
                {fillInBlanksFeedback && (
                  <span className={`ml-3 ${
                    fillInBlanksFeedback.results[1].isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {fillInBlanksFeedback.results[1].isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={fillInBlanks[2]}
                  onChange={(e) => {
                    const newFillInBlanks = [...fillInBlanks];
                    newFillInBlanks[2] = e.target.value;
                    setFillInBlanks(newFillInBlanks);
                  }}
                  className="w-20 p-2 border border-gray-300 rounded-md mr-3 text-center"
                  placeholder="?"
                />
                                <span className="text-lg"> eat breakfast every morning.</span>
                
                {fillInBlanksFeedback && (
                  <span className={`ml-3 ${
                    fillInBlanksFeedback.results[2].isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {fillInBlanksFeedback.results[2].isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={fillInBlanks[3]}
                  onChange={(e) => {
                    const newFillInBlanks = [...fillInBlanks];
                    newFillInBlanks[3] = e.target.value;
                    setFillInBlanks(newFillInBlanks);
                  }}
                  className="w-20 p-2 border border-gray-300 rounded-md mr-3 text-center"
                  placeholder="?"
                />
                <span className="text-lg"> study English together.</span>
                
                {fillInBlanksFeedback && (
                  <span className={`ml-3 ${
                    fillInBlanksFeedback.results[3].isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {fillInBlanksFeedback.results[3].isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={checkFillInBlanks}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Verificar Respostas
              </button>
              
              {fillInBlanksFeedback && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">Resultado:</h3>
                  <p className="text-lg">
                    Você acertou <span className="font-bold text-indigo-700">{fillInBlanksFeedback.score}</span> de {fillInBlanksFeedback.total} questões!
                  </p>
                  
                  {fillInBlanksFeedback.score === fillInBlanksFeedback.total ? (
                    <p className="mt-2 text-green-600 font-medium">Parabéns! Você dominou este exercício!</p>
                  ) : (
                    <div className="mt-4">
                      <p className="text-indigo-600 mb-2">Respostas corretas:</p>
                      <ul className="space-y-2 bg-white p-3 rounded-md">
                        {fillInBlanksFeedback.results.map((result, index) => (
                          <li key={index} className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {index + 1}. {result.correctAnswer} {[
                              'go to school every day.',
                              'likes to read books.',
                              'eat breakfast every morning.',
                              'study English together.'
                            ][index]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Resumo e Pontuação Final */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Resumo dos Exercícios</h2>
        <p className="mb-6">
          Pratique estes exercícios para melhorar seu conhecimento de pronomes e verbos em inglês.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Exercício 1</h3>
            <p>Forme sentenças arrastando pronomes e verbos.</p>
            {dragDropFeedback && dragDropFeedback.type === 'success' && (
              <div className="mt-2 bg-green-500 bg-opacity-30 p-2 rounded-md">
                <p className="font-medium">✓ Concluído</p>
              </div>
            )}
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Exercício 2</h3>
            <p>Escolha a forma correta nas questões de múltipla escolha.</p>
            {multipleChoiceFeedback && (
              <div className={`mt-2 ${
                multipleChoiceFeedback.score === multipleChoiceFeedback.total 
                  ? 'bg-green-500 bg-opacity-30' 
                  : 'bg-yellow-500 bg-opacity-30'
              } p-2 rounded-md`}>
                <p className="font-medium">
                  {multipleChoiceFeedback.score === multipleChoiceFeedback.total 
                    ? '✓ Concluído' 
                    : `${multipleChoiceFeedback.score}/${multipleChoiceFeedback.total} corretas`}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Exercício 3</h3>
            <p>Complete as frases com os pronomes corretos.</p>
            {fillInBlanksFeedback && (
              <div className={`mt-2 ${
                fillInBlanksFeedback.score === fillInBlanksFeedback.total 
                  ? 'bg-green-500 bg-opacity-30' 
                  : 'bg-yellow-500 bg-opacity-30'
              } p-2 rounded-md`}>
                <p className="font-medium">
                  {fillInBlanksFeedback.score === fillInBlanksFeedback.total 
                    ? '✓ Concluído' 
                    : `${fillInBlanksFeedback.score}/${fillInBlanksFeedback.total} corretas`}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
            onClick={() => {
              // Resetar todos os exercícios
              setDragDropItems({
                pronouns: [
                  { id: 'pronoun-1', content: 'I' },
                  { id: 'pronoun-2', content: 'You' },
                  { id: 'pronoun-3', content: 'He' },
                  { id: 'pronoun-4', content: 'She' },
                  { id: 'pronoun-5', content: 'It' },
                  { id: 'pronoun-6', content: 'We' },
                  { id: 'pronoun-7', content: 'They' }
                ],
                verbs: [
                  { id: 'verb-1', content: 'play' },
                  { id: 'verb-2', content: 'eat' },
                  { id: 'verb-3', content: 'drink' },
                  { id: 'verb-4', content: 'work' },
                  { id: 'verb-5', content: 'study' },
                  { id: 'verb-6', content: 'like' },
                  { id: 'verb-7', content: 'go' }
                ],
                sentences: []
              });
              setDragDropFeedback(null);
              setMultipleChoiceAnswers({ q1: '', q2: '', q3: '', q4: '' });
              setMultipleChoiceFeedback(null);
              setFillInBlanks(['', '', '', '']);
              setFillInBlanksFeedback(null);
            }}
          >
            Reiniciar Todos os Exercícios
          </button>
        </div>
      </section>
    </div>
  );
}

export default InteractiveExercises;
                    