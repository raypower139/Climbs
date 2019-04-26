'use strict';

const axios = require('axios');

class ClimbService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getCategories() {
    const response = await axios.get(this.baseUrl + '/api/categoriesapi');
    return response.data;
  }

  async getCategory(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/categoriesapi/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createCategory(newCategory) {
    const response = await axios.post(this.baseUrl + '/api/categoriesapi', newCategory);
    return response.data;
  }

  async deleteAllCategories() {
    const response = await axios.delete(this.baseUrl + '/api/categoriesapi');
    return response.data;
  }

  async deleteOneCategory(id) {
    const response = await axios.delete(this.baseUrl + '/api/categoriesapi/' + id);
    return response.data;
  }

  async deleteAllCategories() {
    const response = await axios.delete(this.baseUrl + '/api/categoriesapi');
    return response.data;
  }

  async deleteOneCategory(id) {
    const response = await axios.delete(this.baseUrl + '/api/categoriesapi/' + id);
    return response.data;
  }

  /* DONATIONS */
  async addClimb(id, climb) {
    try {
      const response = axios.post('/api/categoriesapi/' + id + '/climbs', climb);
      return repsonse.data;
    } catch (e) {
      return null;
    }
  }

  async getClimbs(id) {
    try {
      const response = await axios.get('/api/categoriesapi/' + id + '/climbs');
      return repsonse.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllClimbs() {
    try {
      const response = await axios.delete('/api/climbsapi');
      return repsonse.data;
    } catch (e) {
      return null;
    }
  }


}

module.exports = ClimbService;