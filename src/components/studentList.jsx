// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

const StudentList = ({ detallsEstudiant, onEditStudent, onDeleteStudent }) => {
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
        {detallsEstudiant.map((student) => (
          <tr key={student.key} className="h-12">
            <td className="border px-4 py-2">{student.fname}</td>
            <td className="border px-4 py-2">{student.lname}</td>
            <td className="border px-4 py-2">{student.programa}</td>
            <td className="border px-4 py-2">{student.email}</td>
            <td className="border px-4 py-2 text-center">
              <div className="students-center flex justify-center">
                <MdEdit
                  className="mx-2 cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => onEditStudent(student)}
                />
                <MdDelete
                  className="mx-2 cursor-pointer hover:text-red-500"
                  onClick={() => onDeleteStudent(student.key, student.programa)}
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
  detallsEstudiant: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      edit: PropTypes.string,
      fname: PropTypes.string,
      lname: PropTypes.string,
      programa: PropTypes.string,
      email: PropTypes.string,
      delete: PropTypes.string,
    }),
  ).isRequired,
  onEditStudent: PropTypes.func.isRequired,
  onDeleteStudent: PropTypes.func.isRequired,
  setDetallsEstudiant: PropTypes.func.isRequired,
};

export default StudentList;
