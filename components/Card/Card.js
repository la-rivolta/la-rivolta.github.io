import React, {Fragment, useState} from 'react';

import setState from "../../actions/index.js";
import './Card.scss';

export const Card = (props) => {
  const [data, deleteData] = useState(0); 
  if (props.deleted == false){
    if(data == 0){
      return(
        <div className="card" data-index={props.idCard}>
          <div className="cardText">{props.text}</div>
          <div className="cardFooter">
            <div className={props.liked == true ? "liked" : "like"}onClick={e => likeHandler(e, props.store)} data-index={props.idCard}></div>
            <div className="delete" onClick={e => deleteHandler(e, props.store, data, deleteData), () => {deleteData(1)}} data-index={props.idCard}></div>
          </div>
        </div>
      )
    } else {
        return(
          <Fragment></Fragment>
        );
    }
  }
}

const likeHandler = (e, store) => {
  changeStore(e, store, 'liked');
  checkLikedClass(e, 'liked');
}

const deleteHandler = (e, store, data, deleteData) => { 
  changeStore(e, store, 'deleted');
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
