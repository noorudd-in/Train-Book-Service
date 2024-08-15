class CrudRepository {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      try {
        const result = await this.model.create(data);
        return result;
      } catch (error) {
        console.log("Something went wrong in the repository layer");
        return {
          data: null,
          message: error.message,
          success: false,
          error: error.name
        };
      }
    }
  
    async update(id, data) {
      try {
        const result = await this.model.update(data, {
          where: {
              id: id
          }
        });
        return result;
      } catch (error) {
        console.log("Something went wrong in the repository layer");
        console.log(error);
        return {
          data: null,
          message: error.message,
          success: false,
          error: error.name
        };
      }
    }
  
    async get(id) {
      try {
        const result = this.model.findByPk(id);
        if (!result) {
          return null;
        }
        return result;
      } catch (error) {
        console.log("Something went wrong in the repository layer");
        console.log(error);
        return {
          data: null,
          message: error.message,
          success: false,
          error: error.name
        };
      }
    }
  }
  
  module.exports = CrudRepository;