import React, { useCallback, useEffect, useState } from "react";
import { BATHROOM_SIZE_KEY, BUDGET_KEY, questions } from "../data/questions";
import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { questionState } from "../atoms/question.atom";
import { numberWithCommas } from "../utils";
export default function Result() {
  const [questionAtom] = useRecoilState(questionState);
  const [totalPrice, setTotalPrice] = useState(0);
  const getTotalPrice = () => {
    const allQuestion = getAllQuestion();
    let total = 0;
    allQuestion.forEach((elem) => {
      if (
        elem.key !== BATHROOM_SIZE_KEY &&
        elem.key !== "i" &&
        elem.key !== "h" &&
        elem.showInResult
      ) {
        const result = elem.plan[questionAtom[elem.key]];
        if (!isNaN(result)) {
          total += result;
        }
      } else if (elem.key !== BATHROOM_SIZE_KEY) {
        const result =
          elem.plan[questionAtom[elem.key]?.text] *
          questionAtom[elem.key]?.space;
        if (!isNaN(result)) {
          total += result;
        }
      }
    });

    setTotalPrice(total);
  };
  useEffect(() => {
    getTotalPrice();
  }, [questionAtom]);
  const getAllQuestion = () => {
    const allQuestion = [];
    questions.forEach((elem) => {
      if (elem?.yesDependencies?.length) {
        elem?.yesDependencies.forEach((elem) => {
          if (elem.showInResult) {
            allQuestion.push(elem);
          }
          if (elem?.marbleDependencies?.length) {
            elem?.marbleDependencies.forEach((elem) => {
              if (elem.showInResult) {
                allQuestion.push(elem);
              }
            });
          }
          if (elem?.ceramicDependencies?.length) {
            elem?.ceramicDependencies.forEach((elem) => {
              if (elem.showInResult) {
                allQuestion.push(elem);
              }
            });
          }
        });
      }
    });
    return allQuestion;
  };
  const getQuestion = (key) => {
    const allQuestion = getAllQuestion();
    const elem = allQuestion.find((elem) => elem.key === key);
    return elem;
  };
  const userBudget = questionAtom[BUDGET_KEY];
  const getQuestionAnswer = (key) => {
    if (key !== "i" && key !== "h") {
      return questionAtom[key];
    } else {
      return questionAtom[key].text;
    }
  };
  const getQuestionPrice = useCallback(
    (key) => {
      const allQuestion = getAllQuestion();
      const elem = allQuestion.find((elem) => elem.key === key);
      if (!elem.hiddenNumber) {
        if (key !== "i" && key !== "h") {
          const result = elem.plan[questionAtom[key]];
          return elem.plan[questionAtom[key]];
        } else {
          const result =
            elem.plan[questionAtom[key].text] * questionAtom[key].space;
          return elem.plan[questionAtom[key].text] * questionAtom[key].space;
        }
      }
    },
    [questionAtom]
  );
  return (
    <div className={styles.container}>
      Result
      <div style={{ width: "95%" }}>
        <div className={styles.resultContainer}>
          <div>Prototype</div>
          <div>Type</div>
          <div>Price</div>
        </div>
        {Object.keys(questionAtom).map((key) => {
          return (
            <>
              {getQuestion(key) && (
                <div className={styles.resultItemContainer}>
                  <div>{getQuestion(key).result}</div>
                  <div>{getQuestionAnswer(key)}</div>
                  <div>{numberWithCommas(getQuestionPrice(key))}</div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div
        className={[
          styles.totalPrice,
          userBudget >
            totalPrice *
              getQuestion(BATHROOM_SIZE_KEY).plan[
                questionAtom[BATHROOM_SIZE_KEY]
              ] && styles.green,
          userBudget <
            totalPrice *
              getQuestion(BATHROOM_SIZE_KEY).plan[
                questionAtom[BATHROOM_SIZE_KEY]
              ] && styles.red,
        ].join(" ")}
      >
        Total Price:{" "}
        {numberWithCommas(totalPrice *
          getQuestion(BATHROOM_SIZE_KEY).plan[questionAtom[BATHROOM_SIZE_KEY]])
        }
      </div>
  This amount is x{getQuestion(BATHROOM_SIZE_KEY).plan[questionAtom[BATHROOM_SIZE_KEY]]} for a {questionAtom[BATHROOM_SIZE_KEY]} Bathroom
    </div>
  );
}
