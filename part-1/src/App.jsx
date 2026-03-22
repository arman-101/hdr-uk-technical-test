import './App.css'
import FeedbackForm from './FeedbackForm';

function App() {
  return (
    <main className="min-h-screen bg-bg-tertiary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-text-primary mb-3">
            Feedback Form
          </h1>
          <p className="text-text-muted">Part 1</p>
        </header>
        
        <FeedbackForm />
      </div>
    </main>
  );
}

export default App;
