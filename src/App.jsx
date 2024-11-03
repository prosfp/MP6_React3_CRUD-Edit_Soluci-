/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Form from './components/Form';
import StudentList from './components/studentList';

const App = () => {
  const [tipusEstudiant, setTipusEstudiant] = useState('No Graduat');
  const [ngPlaces, setNGPlaces] = useState(60);
  const [gPlaces, setGPlaces] = useState(40);
  const [detallsEstudiant, setDetallsEstudiant] = useState([]);

  const handleChange = (e) => {
    setTipusEstudiant(e.target.value);
  };

  const setPlacesDisponibles = (updatedPlaces) => {
    tipusEstudiant === 'Graduat'
      ? setGPlaces(updatedPlaces)
      : setNGPlaces(updatedPlaces);
  };

  const handleAddEstudiant = (nouEstudiant) => {
    setDetallsEstudiant((anteriorEstudiants) => [
      ...anteriorEstudiants,
      nouEstudiant,
    ]);
  };

  const restaurarPlaces = (pgm) => {
    pgm === 'Graduat' ? setGPlaces(gPlaces + 1) : setNGPlaces(ngPlaces + 1);
  };

  return (
    <div className="App flex h-screen flex-col items-center justify-center">
      <div className="programes my-2">
        <h3 className="title my-2 text-2xl text-blue-500">
          Formulari d'inscripció d'estudiants.
        </h3>
        <ul className="ulInscripcio">
          <li className="parentLabels my-2 flex items-center justify-evenly">
            <label className="radioLabel">
              <input
                type="radio"
                value="No Graduat"
                name="programGroup"
                defaultChecked
                className="radioInput mr-2"
                onChange={handleChange}
              />
              No Graduat
            </label>
            <label className="radioLabel">
              <input
                type="radio"
                value="Graduat"
                name="programGroup"
                className="radioInput mr-2"
                onChange={handleChange}
              />
              Graduat
            </label>
          </li>
          <li className="parentLabels my-2">
            Places disponibles per estudiant{' '}
            <strong>
              {tipusEstudiant}:{' '}
              {tipusEstudiant === 'Graduat' ? gPlaces : ngPlaces}
            </strong>
          </li>
        </ul>
      </div>
      <Form
        tipusEstudiantSelect={tipusEstudiant}
        setPlacesDisponibles={setPlacesDisponibles}
        placesActuals={tipusEstudiant === 'Graduat' ? gPlaces : ngPlaces}
        handleAddEstudiant={handleAddEstudiant}
      />
      <StudentList
        detallsEstudiant={detallsEstudiant}
        setDetallsEstudiant={setDetallsEstudiant}
        restaurarPlaces={restaurarPlaces}
      />
    </div>
  );
};

export default App;
