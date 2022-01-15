import React, {useState, useEffect} from 'react';
import { createStore } from "redux";  


export default (reducer, array) =>{
    const store = createStore(reducer, array);
    return store;
}