import { DataType,ACTIONTYPE } from "../hooks/reducer";
import Options from "./Options";

type QuestionsProps = {
  questions: DataType | null | undefined;
  answer:number | undefined;
  dispatch:(action:ACTIONTYPE)=>void;
};

export default function Questions({ questions, answer, dispatch}: QuestionsProps) {

  return (
    <div>
      <h4>{questions?.question}</h4>
      <Options questions={questions} answer={answer} dispatch={dispatch} />
    </div>
  );
}
