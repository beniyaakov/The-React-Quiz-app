import { DataType, ACTIONTYPE } from "../hooks/reducer";

type OptionsProps = {
  questions: DataType | null | undefined;
  answer: number | undefined;
  dispatch: (action: ACTIONTYPE) => void;
};

export default function Options({ questions, answer, dispatch }: OptionsProps) {
  const hasAnswered = answer !== undefined;
//   const hasAnswered = answer !== null && answer !== undefined;

  return (
    <div className="options">
      {questions?.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
