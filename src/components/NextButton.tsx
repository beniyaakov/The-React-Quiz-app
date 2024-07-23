import { ACTIONTYPE} from "../hooks/reducer"

type NextButtonProps = {
    dispatch:(action:ACTIONTYPE)=>void
    answer:number | undefined;
    numQuestions:number | undefined
    index:number

}

export default function NextButton({answer,dispatch,numQuestions,index}: NextButtonProps) {
    if (!numQuestions) return;

    if(answer === undefined) return undefined
    
    if (index < numQuestions -1 ) return (<button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>)
    if (index === numQuestions -1) return (  <button className="btn btn-ui" onClick={()=>dispatch({type:"finish"})}>finish</button>)
      
}