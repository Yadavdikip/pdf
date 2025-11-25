import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PDFToPowerPoint from './pages/PDFToPowerPoint';
// ...other imports...

function App() {
  return (
    <Router>
      <Switch>
        {/* ...other routes... */}
        <Route path="/pdf-to-powerpoint" component={PDFToPowerPoint} />
      </Switch>
    </Router>
  );
}

export default App;