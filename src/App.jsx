import { useEffect, useRef } from 'react';
import useQuiz from './hooks/useQuiz';
import QuizStart from './components/QuizStart';
import QuizSubmit from './components/QuizSubmit';
import QuizResults from './components/QuizResults';
import QuizQuestion from './components/QuizQuestion';
import QuizNavigation from './components/QuizNavigation';

function App() {
  const {
    questions,
    answers,
    currentIndex,
    status,
    error,
    score,
    violations,
    startQuiz,
    selectAnswer,
    goNext,
    goPrev,
    submitQuiz,
    addViolation,
  } = useQuiz();

  const violationsRef = useRef(violations);

  useEffect(() => {
    violationsRef.current = violations;
  }, [violations]);

  const handleStart = () => {
    startQuiz();
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  // TRIED TO PREVENT REFRESH
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (status === 'active') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [status]);

  // CHECKED TAB OR WINDOW SWITCHING
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && status === 'active') {
        addViolation('Tab switched or window minimized');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [status, addViolation]);

  // CHECKED FULLSCREEN TO NORMAL SCREEN 
  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement && status === 'active') {
        addViolation('Exited fullscreen mode');
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [status, addViolation]);

  // TRIED TO DETECT IF USER TRIED TO OPEN INSPECT WINDOW
  useEffect(() => {
    const blockDevTools = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        addViolation('Attempted to open developer tools');
      }
    };
    document.addEventListener('keydown', blockDevTools);
    return () => document.removeEventListener('keydown', blockDevTools);
  }, [addViolation]);

  // CHECKED IF USER TRY TO OPEN INSPECT WINDOW BY CLICKING RIGHT KEY OF MOUSE
  useEffect(() => {
    const blockContext = (e) => {
      e.preventDefault();
      if (status === 'active') addViolation('Right-click attempted');
    };
    document.addEventListener('contextmenu', blockContext);
    return () => document.removeEventListener('contextmenu', blockContext);
  }, [status, addViolation]);

  // LOADING WHEN QUESTIONS IS RENDERING
  if (status === 'loading')
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading questions...</div>;

  // ERROR SHOWING
  if (status === 'error')
    return <div className="flex items-center justify-center min-h-screen text-red-600">Error: {error?.message}</div>;

  // FIRST SCREEN WHEN APP RENDERED 
  if (status === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">JavaScript Quiz Exam</h1>
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-8">
            <p className="font-semibold text-amber-800 mb-3">Exam Rules:</p>
            <ul className="list-disc list-inside text-amber-700 space-y-2">
              <li>You must enter fullscreen mode</li>
              <li>Do not refresh, switch tabs, or open developer tools</li>
              <li>Text selection and right-click are disabled</li>
              <li>Any violation will be recorded and may invalidate your score</li>
            </ul>
          </div>
          <QuizStart onStart={handleStart} />
        </div>
      </div>
    );
  }

  // AFTER STARTING THE QUIZ
  if (status === 'active') {
    const currentQuestion = questions[currentIndex];
    const selected = answers[currentQuestion.id];

    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col proctoring-active">
        <div className="bg-red-900 py-3 px-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            {violations.length > 0 && (
              <div className="bg-red-700 px-4 py-2 rounded-lg animate-pulse">
                ⚠️ Violations: {violations.length}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 max-w-4xl mx-auto w-full p-6">

          {/* QUESTIONS RENDER HERE  */}
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selected}
            onSelect={(answer) => selectAnswer(currentQuestion.id, answer)}
          />

          <div className="mt-12 flex justify-between items-center">

            {/* QUETIONS NAVIGATION BY NEXT AND PREVIOUS BUTTON  */}
            <QuizNavigation
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < questions.length - 1}
              onPrev={goPrev}
              onNext={goNext}
            />

            {/* SUBMIT BUTTON ON LAST QUETION */}
            {questions.length - 1 === currentIndex && <QuizSubmit onSubmit={submitQuiz} />}

          </div>
        </div>
      </div>
    );
  }

  // AFTER SUBMITTING QUIZ
  if (status === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full">

          {/* RESULT WITH RIGHT ANSWERS AND PECENTAGE */}
          <QuizResults score={score} total={questions.length} violations={violations} />
        </div>
      </div>
    );
  }

  return null;
}

export default App;