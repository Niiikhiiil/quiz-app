const QuizNavigation = ({ hasPrev, hasNext, onPrev, onNext }) => (
    <div className="flex gap-4">
        <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="px-8 py-3 rounded-lg cursor-pointer font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-600"
        >
            ← Previous
        </button>
        <button
            onClick={onNext}
            disabled={!hasNext}
            className="px-8 py-3 rounded-lg cursor-pointer font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-600"
        >
            Next →
        </button>
    </div>
);

export default QuizNavigation;