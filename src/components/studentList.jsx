// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

const StudentList = ({
  detallsEstudiant,
  setDetallsEstudiant,
  restaurarPlaces,
}) => {
  // Estat per emmagatzemar els detalls dels estudiants
  const [items, setItems] = useState([]);

  // Actualització dels items quan hi ha canvis en els detalls dels estudiants
  useEffect(() => {
    if (detallsEstudiant.length > 0) {
      setItems(detallsEstudiant);
    }
  }, [detallsEstudiant]);

  const handleDelete = (id, program) => {
    const newItems = items.filter((item) => item.key !== id);
    setItems(newItems); // Actualitza l'estat local
    setDetallsEstudiant(newItems); // Actualitza l'estat de `App`
    restaurarPlaces(program);
  };

  return (
    <table className="m-3 table-auto rounded-lg">
      <thead className="bg-blue-500 p-2 px-4 py-2 font-bold text-white">
        <tr>
          <th className="rounded-tl-lg px-4 py-2">Nom</th>
          <th className="px-4 py-2">Cognoms</th>
          <th className="px-4 py-2">Estudis</th>
          <th className="px-4 py-2">Correu</th>
          <th className="rounded-tr-lg px-4 py-2">Accions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.key} className="h-12">
            {' '}
            {/* Set a fixed height for each row */}
            <td className="border px-4 py-2">{item.fname}</td>
            <td className="border px-4 py-2">{item.lname}</td>
            <td className="border px-4 py-2">{item.programa}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2 text-center">
              <div className="flex items-center justify-center">
                <MdEdit className="mx-2 cursor-pointer text-blue-500 hover:text-blue-700" />
                <MdDelete
                  className="mx-2 cursor-pointer hover:text-red-500"
                  onClick={() => handleDelete(item.key, item.programa)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

StudentList.propTypes = {
  action: PropTypes.string.isRequired,
  selectedItemId: PropTypes.string.isRequired,
  restaurarPlaces: PropTypes.func.isRequired,
  detallsEstudiant: PropTypes.shape({
    key: PropTypes.string,
    edit: PropTypes.string,
    fname: PropTypes.string,
    lname: PropTypes.string,
    program: PropTypes.string,
    email: PropTypes.string,
    delete: PropTypes.string,
  }).isRequired,
  setDetallsEstudiant: PropTypes.func.isRequired,
  setAction: PropTypes.func.isRequired,
};

export default StudentList;
