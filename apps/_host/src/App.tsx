import HealthApp from 'health/App';
import InsuranceApp from 'insurance/App';
import MydataApp from 'mydata/App';

function App() {
	return (
		<div>
			Host App
			<HealthApp />
			<InsuranceApp />
			<MydataApp />
		</div>
	);
}

export default App;
