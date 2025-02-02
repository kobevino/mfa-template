import { Route, Routes } from 'react-router-dom';

const routes = [
	{
		path: '',
		element: <div>Insurance App</div>,
	},
	{
		path: 'test',
		element: <div>Health Test App</div>,
	},
	{
		path: '*',
		element: <div>404 Health Error</div>,
	},
];

function App() {
	return (
		<Routes>
			{routes.map(({ path, element }) => {
				return <Route key={path} path={path} element={element} />;
			})}
		</Routes>
	);
}

export default App;
