import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';  

import reducer from "./reducers";
import Store from "./store";
import './App.scss';
import {Card} from './components/Card/Card';


const useFetch = () => {
  const [data, updateData] = useState(null);  
  const requestUrl = 'https://cat-fact.herokuapp.com/facts/';
  useEffect( () => {
    const fetchData = async () => {
      const response = await axios.get(requestUrl);
      updateData(response.data);
    }
    fetchData();
  },[])
  return data;
 }

const App = () =>{
  const cards = useFetch();
  const store = Store(reducer, cards);
  const [likedData, updateLikedData] = useState(0); 

  if(store.getState() != null){
    return(
      <Fragment>
        <h1>Facts about cats</h1>
        <button onClick={()=>{likedData == 0 ? updateLikedData(1) : updateLikedData(0)}}>{likedData == 0 ? 'Only liked' : 'all'}</button>
        <div className="cardContainer">
        {
          Object.values(store.getState()).map((item, index) => {
            if (likedData == 1){
              if(item.liked && !item.deleted){
                return(
                  <Card 
                  key={index}
                  idCard={index}
                  text={item.text}
                  updatedAt={item.updatedAt}
                  like={item.liked}
                  deleted={item.deleted}
                  store={store}
                  />
                  )
              }
            } 
            else if (likedData == 0 && !item.deleted) {
              return(
                <Card 
                key={index}
                idCard={index}
                text={item.text}
                updatedAt={item.updatedAt}
                like={item.liked}
                deleted={item.deleted}
                store={store}
                />
                )
            }
            else {
              return (
                <Fragment></Fragment>
              );
            }
          })
        }
      </div>
      </Fragment>
  )
  } else {
    return (
      <Fragment></Fragment>
    );
  }
}

export default App;
