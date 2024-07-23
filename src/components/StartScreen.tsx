import { ACTIONTYPE } from "../hooks/reducer";


type StartScreenProps = {
  numQuestions:number | undefined
  dispatch:(action:ACTIONTYPE)=>void
};

export default function StartScreen({ numQuestions,dispatch }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's start</button>
    </div>
  );
}
