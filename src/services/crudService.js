class CrudService {
    constructor(repository) {
      this.repository = repository;
    }
  
    async create(data) {
      try {
        const result = await this.repository.create(data);
        return result;
      } catch (error) {
        console.log("Something went wrong at service layer");
        throw { error };
      }
    }
  
    async update(id, data) {
      try {
        const result = await this.repository.update(id, data);
        return result;
      } catch (error) {
        console.log("Something went wrong at service layer");
        throw { error };
      }
    }
  
    async get(id) {
      try {
        const result = this.repository.get(id);
        return result;
      } catch (error) {
        console.log("Something went wrong at service layer");
        throw { error };
      }
    }
  }

  module.exports = CrudService