import { Route, Routes } from 'react-router-dom';

const routes = [
	{
		path: '',
		element: <div>Mydata App 마이데이터</div>,
	},
	{
		path: 'test',
		element: <div>Mydata Test App</div>,
	},
	{
		path: '*',
		element: <div>404 Mydata Error</div>,
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
