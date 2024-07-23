import questionsJson from "./data/questions.json"

import { useEffect, useReducer } from "react";
import { initialState, reducer, DataType } from "./hooks/reducer";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Loader from "./features/Loader";
import ErrorHandle from "./features/ErrorHandle";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Footer from "./layouts/Footer";
import Timer from "./features/Timer";

function App() {

  const [{ questions, status, index, answer, points, highScore, secondsRemaining },dispatch,] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPossiblePoints = questions?.reduce(
    (prev, cur) => prev + cur.points,
    0
  );


  useEffect(() => {

    async function api() {
      try {
        // this part is working if you use "yarn run json-server" the fetch is form the local its open with json-server

        // const res = await fetch("http://localhost:3000/questions");
        // if (!res.ok) {
        //   throw new Error("something went wrong");
        // }

        // const data: DataType[] = await res.json();

        const data: DataType[] = questionsJson.questions
          
        
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        dispatch({ type: "dataFailed", payload: "error" });
      }
    }

    api();
  }, []);

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorHandle />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                numQuestions={numQuestions}
                index={index}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />

              <Questions
                questions={questions?.[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finish" && (
            <Finished
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
