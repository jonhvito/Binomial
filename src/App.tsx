import ProbabilityCalculatorEnhanced from './components/ProbabilityCalculator_Enhanced';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ProbabilityCalculatorEnhanced />
      </div>
    </ThemeProvider>
  );
}

export default App;