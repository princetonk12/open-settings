import './index.css';

import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

import {ThemeProvider, TextInput, Box} from '@primer/react'
import {SearchIcon} from '@primer/octicons-react'
import * as React from 'react';


function App() {
  var [site, setSite] = React.useState('')
  var [finalSite, setFinalSite] = React.useState('')
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(site)
    finalSite = site
    console.log(finalSite)
  }

  const onChange = (event) => {
    setSite(event.target.value)
  }
  return (
    <ThemeProvider>
      <Box sx={{p: 8}}>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          leadingVisual={SearchIcon}
          aria-label="Zipcode"
          placeholder="Where to today? (e.g www.google.com)"
          sx={{width: '100%'}}
          onChange={onChange}
        />
      </form>
      </Box>
      <iframe src={site} style={{border: '0px', width:'100%', height: '100vh'}}></iframe>
    </ThemeProvider>
  );
}

export default App;
