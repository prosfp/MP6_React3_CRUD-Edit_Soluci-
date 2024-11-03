// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

const StudentList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Lògica per borrar estudiants
    if (props.action === 'delete') {
      // filtrem l'array d'estudiants per eliminar l'estudiant seleccionat
      const newItems = items.filter((item) => {
        if (item.key === props.selectedItemId) {
          // restaurem les places disponisbles del tipus d'estudiant corresponent (+1)
          props.restaurarPlaces(item.program);
          return false;
        } else {
          return true;
        }
      });
      setItems(newItems);
    }

    // Lògiga per afegir estudiants
    const isItemKey = props.detallsEstudiant.key;
    if (isItemKey) {
      setItems((prevItems) => [...prevItems, props.detallsEstudiant]);
    }
    // Executem la funció de borrar estudiant per l'ID seleccionat
  }, [props.detallsEstudiant, props.action]);

  useEffect(() => {
    props.setDetallsEstudiant({});
    props.setAction('');
  }, [items]);

  return (
    <table className="m-3 table-auto rounded-lg">
      <thead className="bg-blue-500 p-2 px-4 py-2 font-bold text-white">
        <tr>
          <th className="rounded-l-lg px-4 py-2">Editar</th>
          <th className="px-4 py-2">Nom</th>
          <th className="px-4 py-2">Cognoms</th>
          <th className="px-4 py-2">Estudis</th>
          <th className="px-4 py-2">Correu</th>
          <th className="rounded-r-lg px-4 py-2">Borrar</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item.key}>
              <td className="border px-4 py-2">{item.edit}</td>
              <td className="border px-4 py-2">{item.fname}</td>
              <td className="border px-4 py-2">{item.lname}</td>
              <td className="border px-4 py-2">{item.program}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.delete}</td>
            </tr>
          );
        })}
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
