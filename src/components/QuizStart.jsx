const QuizStart = ({ onStart }) => (
    <div className="text-center">
        <button
            onClick={onStart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition transform hover:scale-105 shadow-lg"
        >
            Start Exam
        </button>
    </div>
);

export default QuizStart;