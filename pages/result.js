import React, { useCallback, useEffect, useState } from "react";
import { BATHROOM_SIZE_KEY, BUDGET_KEY, questions,TILING_KEY,TILING_KEY_CHOICE } from "../data/questions";
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
    console.log('allQuestion',allQuestion)
    allQuestion.forEach((elem) => {
      try{
        console.log('elem',{elem,total})
        if (
          elem.key !== BATHROOM_SIZE_KEY &&
          elem.key !== TILING_KEY&&
          elem.showInResult
        ) {
          const result = elem.plan[questionAtom[elem.key]];
          if (!isNaN(result)) {
            total += result;
          }
        } else if (elem.key !== TILING_KEY && elem.key !== BATHROOM_SIZE_KEY) {
          const result =
            elem.plan[questionAtom[elem.key]?.text] *
            questionAtom[elem.key]?.space;
            console.log(result)
          if (!isNaN(result)) {
            total += result;
          }
        }else if(elem.key===TILING_KEY){
          const result =(elem.plan[questionAtom[TILING_KEY].text] * questionAtom[TILING_KEY].space)* 
          getQuestion(BATHROOM_SIZE_KEY).plan[questionAtom[BATHROOM_SIZE_KEY]];
          if (!isNaN(result)) {
            total += result;
          }
          console.log('TILING_KEY')
        }
      }catch(e){
        console.log(e)
      }
      console.log('hereeeee')
    });
    console.log('questionAtom[TILING_KEY_CHOICE]',questionAtom[TILING_KEY_CHOICE])
    console.log('total123',total)
    setTotalPrice(total);
  };
  useEffect(() => {
    getTotalPrice();
  }, [questionAtom]);
  const getAllQuestion = () => {
    console.log("123")
    const allQuestion = [];
    questions.forEach((elem) => {
      if (elem?.yesDependencies?.length) {
        elem?.yesDependencies.forEach((elem) => {
          if (elem.showInResult) {
            allQuestion.push(elem);
          }
          const key=`${questionAtom[TILING_KEY_CHOICE]}Dependencies`
          if (elem[key]?.length) {
            elem[key].forEach((elem) => {
              if (elem.showInResult) {
                allQuestion.push(elem);
              }
            });
          }
          console.log('111111')
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
    if (key !== TILING_KEY) {
      return questionAtom[key];
    } else {
      return `${questionAtom[key].text}-${questionAtom[BATHROOM_SIZE_KEY]}`;
    }
  };
  const getQuestionPrice = useCallback(
    (key) => {
      const allQuestion = getAllQuestion();
      const elem = allQuestion.find((elem) => elem.key === key);
      if (!elem.hiddenNumber) {
        if (key !== TILING_KEY && key !== BATHROOM_SIZE_KEY) {
          return elem.plan[questionAtom[key]];
        } else if(key === BATHROOM_SIZE_KEY) {
          return ''
        }else{
          return (elem.plan[questionAtom[key].text] * questionAtom[key].space)* 
          getQuestion(BATHROOM_SIZE_KEY).plan[questionAtom[BATHROOM_SIZE_KEY]];
        }
      }
    },
    [questionAtom]
  );
  return (
   <div className={styles.resultContainer}>
     Our Quote 💰
<table className={styles.table}>
  <tr>
    <th>Prototype</th>
    <th>Type</th>
    <th>Price</th>
  </tr>
  {Object.keys(questionAtom).map((key) => {
    return (
      <>
        {getQuestion(key) && (
            <tr>
            <td>{getQuestion(key).result}</td>
            <td>{getQuestionAnswer(key)}</td>
            <td>{numberWithCommas(getQuestionPrice(key))}</td>
          </tr>
        )}
      </>
    );
  })}
  <tr>
    <th>total</th>
    <th> </th>
    <th
  className={[
    userBudget >
      totalPrice && styles.green,
    userBudget <
      totalPrice && styles.red,
  ].join(" ")}>${numberWithCommas(totalPrice)}</th>
  </tr>
</table>
   </div>
  );
}
{/* <div className={styles.container}>
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
<div style={{marginTop:20}}>
  Total Price: {totalPrice}
</div>
This amount is x{getQuestion(BATHROOM_SIZE_KEY).plan[questionAtom[BATHROOM_SIZE_KEY]]} for a {questionAtom[BATHROOM_SIZE_KEY]} Bathroom
<div style={{ width: "95%" }}>
  <div className={styles.resultContainer}>
    <div
  style={{width:200,minWidth:200,maxWidth:200, fontWeight:"bold"}}>Plan</div>
    <div
  style={{width:200,minWidth:200,maxWidth:200}}>Price</div>
  </div>
  {Object.entries(getQuestion(BATHROOM_SIZE_KEY).plan).map((plan) => {
    console.log('plan', plan);
    return (
      <>
      <div className={styles.resultItemContainer}
  style={{width:200,minWidth:200,maxWidth:200}}>
      <div
  style={{width:200,minWidth:200,maxWidth:200}}>{plan[0]}</div>  
       <div 
  className={[
    userBudget >
      totalPrice *plan[1] && styles.green,
    userBudget <
      totalPrice *plan[1]&& styles.red,
  ].join(" ")}
  style={{width:200,minWidth:200,maxWidth:200}}
  >{}
       {numberWithCommas(totalPrice *plan[1])
  }</div>
      </div>
      </>
    );
  })}
</div>
</div> */}