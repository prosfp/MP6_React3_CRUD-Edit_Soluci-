// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// PropTypes ens permet validar les propietats que reben els components
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Form = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleInputReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  // handle click event of submit/edit button
  const handleClick = (event) => {
    event.preventDefault(); // Evitar el refresc de la pàgina
    const id = uuidv4(); // Genera un ID únic
    props.handleAddEstudiant({
      key: id,
      fname: firstName,
      lname: lastName,
      programa: props.tipusEstudiantSelect,
      email: email,
    });
    props.setPlacesDisponibles(props.placesActuals - 1);
    handleInputReset();
  };

  // handle input change
  // Cada cop que es modifica un camp de text, actualitzem l'estat corresponent
  const handleInputChange = (setInput, event) => {
    setInput(event.target.value);
  };

  return (
    <div className="flex w-3/4 justify-center">
      <form className="enrolForm w-2/3" name="enrolForm">
        <ul className="ulEnrol flex w-full flex-col items-stretch">
          <li className="mb-2">
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="text"
              name="firstname"
              placeholder="Nom"
              value={firstName}
              onChange={(event) => handleInputChange(setFirstName, event)}
            />
          </li>
          <li>
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="text"
              name="lastname"
              placeholder="Cognom"
              value={lastName}
              onChange={(event) => handleInputChange(setLastName, event)}
            />
          </li>
          <li>
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => handleInputChange(setEmail, event)}
            />
          </li>
          <li className="self-center">
            <input
              className="mb-4 rounded bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              name="Enrol"
              alt="Enrol"
              value="Inscripció"
              onClick={handleClick}
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

// Validem les propietats que rep el component
// Amb PropTypes definim el tipus de dades que s'esperen i si són obligatòries o no
Form.propTypes = {
  setPlacesDisponibles: PropTypes.func.isRequired,
  placesActuals: PropTypes.number.isRequired,
  setDetallsEstudiant: PropTypes.func.isRequired,
  tipusEstudiantSelect: PropTypes.string.isRequired,
  handleAddEstudiant: PropTypes.func.isRequired,
};

export default Form;
