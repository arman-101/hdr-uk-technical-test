import { useState } from 'react';

export default function FeedbackForm() {
  // 1. State Management
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // 2. Validation: Show error if user submits without selecting a rating
    if (rating === 0) {
      setValidationError('Please select a rating between 1 and 5 stars.');
      return;
    }

    // Both fields are required
    if (!comment.trim()) {
      setValidationError('Please provide a comment.');
      return;
    }

    // 3. Simulate API call with 1.5 second delay
    setStatus('loading');
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
  };

  // 4. Success Message State
  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto p-8 bg-bg-card border border-border-primary rounded-lg shadow-lg text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Success!</h2>
        <p className="text-text-muted">Thank you for your feedback. We appreciate your input.</p>
        <button 
          onClick={() => { setStatus('idle'); setRating(0); setComment(''); }}
          className="mt-6 text-sm font-semibold text-link hover:text-accent-pink transition-colors"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-bg-card border border-border-primary rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-text-primary mb-6 border-b pb-2">Product Feedback</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating Selection */}
        <div>
          <label className="block text-sm font-bold text-text-secondary mb-3">
            How would you rate your experience? *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={status === 'loading'}
                onClick={() => setRating(star)}
                className={`transition-all duration-200 transform hover:scale-110 ${
                  star <= rating ? 'text-primary' : 'text-text-light hover:text-accent-pink'
                }`}
              >
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Comment Text Area */}
        <div>
          <label htmlFor="comment" className="block text-sm font-bold text-text-secondary mb-2">
            Your Comments *
          </label>
          <textarea
            id="comment"
            rows="4"
            disabled={status === 'loading'}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 bg-bg-secondary text-text-primary border border-border-primary rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="What can we improve?"
          />
        </div>

        {/* Validation Error Display */}
        {validationError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm font-medium animate-shake">
            {validationError}
          </div>
        )}

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full py-3 px-4 rounded-md font-bold text-white transition-all transform flex items-center justify-center gap-2 ${
            status === 'loading'
              ? 'bg-primary-light cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg'
          }`}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
}