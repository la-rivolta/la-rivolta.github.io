import React from 'react';

import setState from "../../actions/index.js";
import './Card.scss';

export const Card = (props) => {
    return(
        <div className={props.liked == true ? "card liked" : "card"} data-index={props.idCard}>
            <div className="cardText">{props.text}</div>
            <div className="cardDate">{props.date}</div>
            <div onClick={e => likeHandler(e, props.store)} data-index={props.idCard}>Like</div>
            <div onClick={e => deleteHandler(e, props.store)} data-index={props.idCard}>Delete</div>
        </div>
    )
}

const likeHandler = (e, store) => {
    changeStore(e, store, 'liked');
    checkLikedClass(e, 'liked');
  }

  const deleteHandler = (e, store) => {
    changeStore(e, store, 'deleted');
    e.target.parentNode.remove();
  }

  const changeStore = (e, store, currentProp) =>{
    const currentId = e.target.dataset.index;
    let newStore = [];
    store.getState().map((item, index) => {
        if(index == currentId){
            if(item[`${currentProp}`] == true){
                item[`${currentProp}`] = false;
            }else{
                item[`${currentProp}`] = true;
            }
        }
        newStore.push(item);
    })
    store.dispatch(setState(newStore));
  }

  const checkLikedClass = (e, searchClassName) => {
    if( e.target.classList.contains(searchClassName)){
        e.target.classList.remove(searchClassName);
    } else {
        e.target.classList.add(searchClassName);
    }
  }
