import React from 'react';

const RegionContext = React.createContext({
    selectedArea:'',
    setSelectedArea: () => {},
    selectedCity:'Taipei',
    setSelectedCity:() => {},

})

export default RegionContext;