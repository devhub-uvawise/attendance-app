import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Button} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'; // <-- Import app theme

import Routes from './navigation/index';


export default function App() {

  return(
    <>
  <IconRegistry icons={EvaIconsPack} />
  <ApplicationProvider 
    {...eva}
    theme={{ ...eva.dark, ...theme }}
    >
      <Routes />
  </ApplicationProvider>
  </>

  );
}