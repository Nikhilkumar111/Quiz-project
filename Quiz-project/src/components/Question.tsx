import useQuizStore from "../store/useQuizStore";
// import QuestionType from "../store/useQuizStore"
const Question = () => {
  const {

    questions,
    currentQuestion,
    selectAnswer,
    answers,
    nextQuestion,
    prevQuestion,
    showScore,
    score,
    resetQuiz,
    solution,
    showSolution,
    
  } = useQuizStore();

  if (showScore) {
    return (
      <div className="w-3/4 p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Your Score</h2>
        <p className="text-lg mb-6">
          You scored <span className="font-semibold">{score}</span> out of{" "}
          {questions.length}
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Restart Quiz
        </button>
      </div>
    );
  }


  const question = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  const handleSelect = (optionIndex: number) => {
    selectAnswer(optionIndex);
  };

  const handleNext = () => {
    if (showSolution) solution(); // Hide solution when navigating
    nextQuestion();
  };

  const handlePrev = () => {
    if (showSolution) solution(); // Hide solution when navigating
    prevQuestion();
  };

  return (
    <div className="w-3/4 p-6">
      {/* Question text */}
      <h3 className="text-2xl font-bold mb-4">{question.question}</h3>

      {/* List of options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let optionClasses = "bg-white border-gray-300 hover:bg-gray-50";

          if (showSolution) {
            if (index === question.correctAnswer) {
              optionClasses = "bg-green-100 border-green-500";
            } else if (index === currentAnswer && currentAnswer !== question.correctAnswer) {
              optionClasses = "bg-red-100 border-red-500";
            }
          } else if (currentAnswer === index) {
            optionClasses = "bg-blue-100 border-blue-500";
          }

          return (
            <label
              key={index}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${optionClasses}`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={currentAnswer === index}
                onChange={() => handleSelect(index)}
                className="mr-3"
                disabled={showSolution} // Disable selecting after showing solution
              />
              {option}
            </label>
          );
        })}
      </div>

      {/* Show Solution button */}
      <button
        onClick={solution}
        disabled={currentAnswer === null}
        className={`mb-4 px-5 py-2 rounded-lg shadow transition ${
          currentAnswer === null
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-yellow-500 text-white hover:bg-yellow-600"
        }`}
      >
        Show Solution
      </button>

      {/* Show explanation & correct answer */}
      {showSolution && (
        <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 text-green-800 rounded">
          <p>
            <strong>Correct Answer:</strong>{" "}
            <span className="font-semibold text-green-700">

              {question.options[question.correctAnswer]}
            </span>
          </p>
          <p className="mt-2">
            <strong>Explanation:</strong> {question.Explanation}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-6">
        {currentQuestion > 0 ? (
          <button
            onClick={handlePrev}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
