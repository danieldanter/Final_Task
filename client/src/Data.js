import config from './config';

export default class Data {
  // the Data class handles a lot of api Calls


  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
  if (requiresAuth) {  
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }


    return fetch(url, options);
  }





  async getUser(emailAddress, password){
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      //console.log('data response');
      //console.log(password);
      //console.log(response.body);
      
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password) {

    console.log("create coures fuction")
    console.log(course);
    console.log("create coures fuction2")

    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password }); //, true, { emailAddress, password }
    console.log(response.status)
    if (response.status === 201) {
      
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }


  async updateCourse(course, emailAddress, password, id) {

    console.log("create coures fuction")
    console.log(course);
    console.log("create coures fuction2")

    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password }); //, true, { emailAddress, password }
    console.log(response.status)
    if (response.status === 204) {
      
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }





}
