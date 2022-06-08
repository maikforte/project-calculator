import './App.css';
import { StatsCalculator } from './pages/Pages';

import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<StatsCalculator/>}>
				</Route>
			</Routes>
		</Router>
		// <div className="App">
		// 	<header className="App-header">
		// 		<img src={logo} className="App-logo" alt="logo" />
		// 		<p>
		// 			Edit
		// 			{' '}
		// 			<code>src/App.js</code>
		// 			{' '}
		// 			and save to reload.
		// 		</p>
		// 		<a
		// 			className="App-link"
		// 			href="https://reactjs.org"
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 		>
		// 			Learn React
		// 		</a>
		// 		<Button>aa</Button>
		// 		<Label>ma label</Label>
		// 		<Gem gem='fortitude' shape='triangle' upgrade='3'></Gem>
		// 	</header>
		// </div>
	);
}

export default App;
