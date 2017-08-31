import React from 'react';

import {
	Framework7App, Statusbar
} from 'framework7-react';

import AppLoginScreen from './Login'
import {routes} from '../routes';

export const App = () => (	
	<Framework7App themeType="material" routes={routes}>		
		<Statusbar />		
		<AppLoginScreen />
	</Framework7App>  
);
