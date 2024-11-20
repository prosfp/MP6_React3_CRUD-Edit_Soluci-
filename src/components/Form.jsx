// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// PropTypes ens permet validar les propietats que reben els components
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Form = ({
  edicioEstudiant,
  handleUpdateStudent,
  handleAddEstudiant,
  cancelEdit,
  ...props
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Estem en mode edició o afegint un nou estudiant?
  // Amb el useEffect, podem disparar una funció cada vegada que canvïi una propietat, en aquest cas edicioEstudiant
  useEffect(() => {
    if (edicioEstudiant) {
      // Si tenim edicioEstudiant, estem en mode d'edició; omplim els camps amb les dades
      setFirstName(edicioEstudiant.fname);
      setLastName(edicioEstudiant.lname);
      setEmail(edicioEstudiant.email);
    } else {
      // Si no tenim edicioEstudiant, estem afegint un nou estudiant; resetejem els camps
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  }, [edicioEstudiant]);

  const handleInputReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (edicioEstudiant) {
      // Mode d'edició: actualitzem l'estudiant existent
      handleUpdateStudent({
        ...edicioEstudiant,
        fname: firstName,
        lname: lastName,
        email: email,
      });
    } else {
      // Mode d'afegir: afegim un nou estudiant
      const nouEstudiant = {
        key: uuidv4(), // Genera un nou ID únic
        fname: firstName,
        lname: lastName,
        programa: props.tipusEstudiantSelect,
        email: email,
      };
      handleAddEstudiant(nouEstudiant);
      props.setPlacesDisponibles(props.placesActuals - 1);
    }

    // Buidem els camps en acabar
    handleInputReset();
  };

  // handle input change
  // Cada cop que es modifica un camp de text, actualitzem l'estat corresponent
  const handleInputChange = (setInput, event) => {
    setInput(event.target.value);
  };

  return (
    <div className="flex w-3/4 justify-center">
      <form
        className="enrolForm w-2/3"
        name="enrolForm"
        onSubmit={handleSubmit}
      >
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
              value={edicioEstudiant ? 'Desar' : 'Inscripció'}
            />
          </li>
          {edicioEstudiant && (
            <li className="self-center">
              <button
                type="button"
                className="mb-4 rounded bg-gray-500 p-2 px-4 py-2 font-bold text-white hover:bg-gray-700"
                onClick={cancelEdit}
              >
                Cancel·lar
              </button>
            </li>
          )}
        </ul>
      </form>
    </div>
  );
};

// Validem les propietats que rep el component
// Amb PropTypes definim el tipus de dades que s'esperen i si són obligatòries o no
Form.propTypes = {
  edicioEstudiant: PropTypes.shape({
    fname: PropTypes.string,
    lname: PropTypes.string,
    email: PropTypes.string,
  }),
  handleUpdateStudent: PropTypes.func.isRequired,
  handleAddEstudiant: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  setPlacesDisponibles: PropTypes.func.isRequired,
  placesActuals: PropTypes.number.isRequired,
  setDetallsEstudiant: PropTypes.func.isRequired,
  tipusEstudiantSelect: PropTypes.string.isRequired,
};

export default Form;
