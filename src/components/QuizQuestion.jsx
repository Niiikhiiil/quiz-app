const QuizQuestion = ({ question, selectedAnswer, onSelect }) => (
    <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-8 text-center">{question.question}</h2>
        <div className="space-y-4">
            {question.options.map((option, idx) => (
                <label
                    key={idx}
                    className={`block p-5 rounded-lg border-2 cursor-pointer transition-all ${selectedAnswer === option
                        ? 'bg-indigo-600 border-indigo-400 shadow-lg'
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                        }`}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => onSelect(option)}
                        className="sr-only"
                    />
                    <span className="text-lg">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

export default QuizQuestion;