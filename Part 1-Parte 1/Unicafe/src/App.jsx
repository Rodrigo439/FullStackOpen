import { useState } from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / total || 0;
  const positivePercentage = (props.good / total) * 100 || 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics/Estadisticas</h2>
      <table>
        <tbody>
          <tr>
            <td>Good/Bueno:</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>Neutral/Neutral:</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>Bad/Malo:</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>All/Todos:</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average/Promedio:</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>Positive Percentage/Porcentaje de positivos:</td>
            <td>{positivePercentage}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleClick = (increment) => {
    setFeedbackGiven(true);
    increment();
  };

  return (
    <div>
      <h1>Give FeedBack/Retroalimentacion</h1>
      <Button text="Good" handleClick={() => handleClick(() => setGood(good + 1))} />
      <Button text="Neutral" handleClick={() => handleClick(() => setNeutral(neutral + 1))} />
      <Button text="Bad" handleClick={() => handleClick(() => setBad(bad + 1))} />
      {feedbackGiven && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  );
};

export default App;