import { useEffect } from "react";
import { ACTIONTYPE } from "../hooks/reducer";

type TimerProps = {
  dispatch: (action: ACTIONTYPE) => void;
  secondsRemaining: number | undefined;
};

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
 
    
  useEffect(()=> {
    if (secondsRemaining) {
      
      const id = setInterval(() => {
        
        dispatch({ type: "tick" });
        
      }, 1000);
      
      
      return () => clearInterval(id);
    }
  }, [dispatch,secondsRemaining]);

  if (secondsRemaining === undefined || secondsRemaining <= 0) return null;


  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
    
  return <div className="timer">{mins < 10 && "0"}{mins}:{seconds<10 && "0"}{seconds}</div>;
}
