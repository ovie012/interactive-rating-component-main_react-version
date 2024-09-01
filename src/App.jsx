import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [selectedRating, setSelectedRating] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const handleSubmit = () => {
        if(selectedRating) {
            setSubmitted(true);
            setAlert(false);
        } else {
            setAlert(true);
        };
    };

    const handleAlertClose = () => {
        setAlert(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(!event.target.closest('.alert') && !event.target.closest('.submit')) {
                setAlert(false);
            };
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };

    }, []);

  return (
    <>
      <div className="container">
        {!submitted ? (
        <div className="main">
            <div className="img">
                <img src="/icon-star.svg" alt="star icon" />
            </div>
            <div className="texts">
                <h3>How did we do?</h3>
                <p>Please let us know how we did with your support request. All feedback is appreciated 
                    to help us improve our offering!</p>
            </div>
            <div className="ratings">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button 
                        key={rating}
                        className={`rating ${selectedRating === rating ? 'focus' : ''}`}
                        onClick={() => handleRatingClick(rating)}
                    >
                        {rating}
                    </button>
                ))}
            </div>
            <div className="submit-button">
                <button className="submit" onClick={handleSubmit} >SUBMIT</button>
            </div>
        </div>
        ) : (
        <div className="clicked">
            <div className="image">
                <img src="/illustration-thank-you.svg" alt="thank you" />
            </div>
            <div className="ratings-text">
                <p>You selected {selectedRating} out of 5</p>
            </div>
            <div className="appreciation">
                <h3>Thank you!</h3>
                <p>We appreciate you taking the time to give a rating. If you ever need more support, 
                    don’t hesitate to get in touch!</p>
            </div>
        </div>
      )}
    </div>


    {alert && (
        <div className="alert">
            <p className="alert-message">we would appreciate it if you'd pick a rating!</p>
            <button className="alert-button" onClick={handleAlertClose} >Ok</button>
        </div>
    )}
    </>
  );
};

export default App


//LEGEND.DEV made this