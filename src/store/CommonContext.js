import React from 'react';

const RegionContext = React.createContext({
    selectedArea:'',
    setSelectedArea: () => {},
    selectedCity:'Taipei',
    setSelectedCity:() => {},
    fetchDatas:()=>{},
    filterAndRandomData:() => {},
    spanIndexActive: 0,
    setSpanIndexActive:() => {},
    offsetpiece:3,
    setOffsetpiece:() => {},
})

export default RegionContext;