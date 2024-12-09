const db = require('../db');

module.exports.getAllEmployes = async () => {
  const [records] = await db.query('SELECT * FROM employes');
  return records;
};

module.exports.getEmployeById = async (id) => {
  const [[record]] = await db.query('SELECT * FROM employes WHERE id = ?', [
    id,
  ]);
  return record;
};

module.exports.deleteEmploye = async (id) => {
  const [[affectedRows]] = await db.query('DELETE FROM employes WHERE id = ?', [
    id,
  ]);
  return affectedRows;
};

module.exports.addOrdEditEmployes = async (obj, id = 0) => {
  const [[affectedRows]] = await db.query(
    'CALL usp_employes_add_or_edit(?, ?, ?, ?)',
    [id, obj.name, obj.employes_code, obj.salary]
  );
  return affectedRows;
};
