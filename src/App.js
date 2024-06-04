import React from 'react';
import PropertyPage from './Components/PropertyPage';
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  return (
    <div className="App">
      <PropertyPage />
      <Analytics />
    </div>
  );
};

export default App;
