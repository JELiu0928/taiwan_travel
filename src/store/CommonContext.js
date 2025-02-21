import React from 'react';

const RegionContext = React.createContext({
    selectedArea:'',
    setSelectedArea: () => {},
    selectedCity:'Taipei',
    setSelectedCity:() => {},
    fetchDatas:()=>{},
    fetchAndRandomDatas:() => {},
    spanIndexActive: 0,
    setSpanIndexActive:() => {},
    offsetpiece:3,
    setOffsetpiece:() => {},
    searchKeyword:() => {},
})

export default RegionContext;