const QuizResults = ({ score, total, violations = [] }) => (
    <div className="text-center">
        <h1 className="text-5xl font-bold text-indigo-800 mb-6">Exam Completed!</h1>
        <div className="text-3xl mb-8">
            <span className="font-bold text-green-600">{score}</span> / {total}
        </div>
        <div className="text-2xl mb-10">
            Percentage: <strong>{((score / total) * 100).toFixed(2)}%</strong>
        </div>

        {violations.length > 0 ? (
            <div className="bg-red-100 border-4 border-red-500 rounded-xl p-8 mt-10">
                <h3 className="text-2xl font-bold text-red-800 mb-4">⚠️ Suspicious Activity Detected</h3>
                <p className="text-lg text-red-700 mb-4">{violations.length} violation(s) recorded:</p>
                <ul className="text-left bg-red-50 rounded-lg p-4 space-y-2">
                    {violations.map((v, i) => (
                        <li key={i} className="text-red-800">• {v}</li>
                    ))}
                </ul>
                <p className="mt-6 text-red-900 font-semibold">
                    This exam has been flagged for review.
                </p>
            </div>
        ) : (
            <div className="bg-green-100 border-4 border-green-500 rounded-xl p-8 mt-10">
                <p className="text-3xl">✅ No violations detected</p>
                <p className="text-xl mt-4 text-green-800">Great job! Your exam is clean.</p>
            </div>
        )}
    </div>
);

export default QuizResults;