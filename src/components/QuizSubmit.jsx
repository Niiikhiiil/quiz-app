const QuizSubmit = ({ onSubmit }) => (
    <button
        onClick={onSubmit}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition transform hover:scale-105 shadow-lg"
    >
        Submit Exam
    </button>
);

export default QuizSubmit;