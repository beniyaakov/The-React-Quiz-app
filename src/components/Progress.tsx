
type ProgressProps = {
    numQuestions:number | undefined
    index:number
    points:number
    maxPossiblePoints:number | undefined
    answer:number | undefined
}

export default function Progress({index,numQuestions,points,maxPossiblePoints,answer}: ProgressProps) {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={index + Number(answer !== null)} />
        <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
        <p><strong>{points}</strong> / {maxPossiblePoints}</p>
    </header>
  )
}