export type DataType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id?: string;
};

export type State = {
  questions: DataType[] | null;
  status: string;
  index: number;
  answer: number | undefined;
  points: number;
  highScore:number;
  secondsRemaining:number | undefined;
};

export type ACTIONTYPE =
  | { type: "dataReceived"; payload: DataType[] }
  | { type: "dataFailed"; payload: string }
  | { type: "newAnswer"; payload: number }
  | { type: "start";}
  | { type: "nextQuestion"; }
  | { type: "finish"; }
  | { type: "restart"; }
  | { type: "tick"; }

export const initialState: State = {
  questions: null,
  status: "loading",
  index: 0,
  answer: undefined,
  points: 0,
  highScore:0,
  secondsRemaining:undefined
};

const SECONDS_PER_QUESTION:number = 30

export function reducer(state: State, action: ACTIONTYPE): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active", secondsRemaining:state.questions ? state.questions.length * SECONDS_PER_QUESTION : undefined };

    case "newAnswer":{

      const question = state.questions?.[state.index]
      
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question?.correctOption ? state.points + question.points : state.points
      };
    }

    case "nextQuestion":
      return {...state,index: state.index + 1,answer:undefined}

    case "finish":
    return {...state,status: "finish",highScore: state.points > state.highScore ? state.points : state.highScore}

    case "restart":
    return {...initialState, questions: state.questions ,status:"ready"}

    case "tick":
      if (state.secondsRemaining === undefined) return state

      return {...state,secondsRemaining: state?.secondsRemaining -1,status: state.secondsRemaining === 0 ? "finish" : state.status}

    default:
      throw new Error("Action unknown");
  }
}
