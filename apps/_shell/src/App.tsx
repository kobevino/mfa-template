import HealthApp from 'health/App';
import InsuranceApp from 'insurance/App';
import MydataApp from 'mydata/App';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<div>
				Host Application
				<h1>Completed!!</h1>
				<nav>
					<Link to="/health">health</Link>
					<br />
					<Link to="/insurance">insurance</Link>
					<br />
					<Link to="/mydata">mydata</Link>
					<br />
				</nav>
			</div>
		),
	},
	{
		path: '/test',
		element: <div>test</div>,
	},
	{
		path: '/health/*',
		element: <HealthApp />,
	},
	{
		path: '/insurance/*',
		element: <InsuranceApp />,
	},
	{
		path: '/mydata/*',
		element: <MydataApp />,
	},
	{
		path: '*',
		element: <div>404 Host Error</div>,
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
