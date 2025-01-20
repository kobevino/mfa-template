import HealthApp from 'health/App';
import InsuranceApp from 'insurance/App';
import MydataApp from 'mydata/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

console.log(import.meta.env.MODE)

const router = createBrowserRouter([
	{
		path: '/',
    element: <div>Host App</div>,
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
])

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
