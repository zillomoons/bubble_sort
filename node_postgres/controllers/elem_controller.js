const db = require('../db');

class ElementsController {
  async createElements(req, res) {
    const { sorting_id, array } = req.body;

    const elems = [];
    for (let el of array) {
      let temp = await db.query(
        `INSERT INTO sorting_elements (sorting_id, val) VALUES ($1, $2) RETURNING *`,
        [sorting_id, el]
      );
      elems.push(temp.rows[0]);
    }
    res.json(elems);
  }

  async getElementsBySortingId(req, res) {
    const sorting_id = req.params.id;
    const elements = await db.query(
      `SELECT * FROM sorting_elements where sorting_id = $1`,
      [sorting_id]
    );
    if (elements.rows.length === 0) {
      res.json('Сортировки с таким идентификатором не существует.');
    }
    res.json(elements.rows);
  }
}

module.exports = new ElementsController();
