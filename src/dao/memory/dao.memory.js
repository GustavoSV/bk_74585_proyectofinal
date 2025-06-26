class DaoMemory {
  constructor() {
    
  }

  createOne = async (data) => {/* crear registro */};
  readAll = async (filter) => {/* leer todos los registros */};
  readBy = async (data) => {/* leer un registro */};
  readById = async (id) => {/* leer por Id registro */};
  updateById = async (id, data) => {/* actualizar un registro */};
  destroyById = async (id) => {/* eliminar un registro */};
}

const usersManager = new DaoMemory();
const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();

export { usersManager, productsManager, cartsManager };