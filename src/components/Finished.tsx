import { ACTIONTYPE } from "../hooks/reducer";

type FinishedProps = {
  points: number;
  maxPossiblePoints: number | undefined;
  highScore:number;
  dispatch:(action:ACTIONTYPE)=>void
};

export default function Finished({ maxPossiblePoints, points, highScore,dispatch }: FinishedProps) {
  let percentage: number = 0;

  let emoji: string = "";
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🤟";
  if (percentage >= 50 && percentage < 80) emoji = "👌";
  if (percentage >= 80 && percentage < 50) emoji = "👍";
  if (percentage === 0) emoji = "👎";

  if (maxPossiblePoints !== undefined) {
    percentage = (points / maxPossiblePoints) * 100;
  }

  return (
    <>
    <p className="result">
      <span>{emoji}</span> you scored <strong>{points}</strong> out of {maxPossiblePoints} {Math.ceil(percentage)} %
    </p>
    <p className="high-score">(HighScore: {highScore} points)</p>
    <button className="btn btn-iu" onClick={()=> dispatch({type:"restart"})}>restart Quiz</button>
    </>
  );
}
