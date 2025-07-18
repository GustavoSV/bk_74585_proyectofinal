class DaoFs {
  constructor() {
    
  }

  createOne = async (data) => {/* crear registro */};
  readAll = async (filter) => {/* leer todos los registros */};
  readBy = async (data) => {/* leer un registro */};
  readById = async (id) => {/* leer por Id registro */};
  updateById = async (id, data) => {/* actualizar un registro */};
  destroyById = async (id) => {/* eliminar un registro */};
}

const usersManager = new DaoFs();
const productsManager = new DaoFs();
const cartsManager = new DaoFs();

export { usersManager, productsManager, cartsManager };