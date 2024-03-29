import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { API_URL } from 'src/globals';
import { CreateUserModel } from '../models/requestModels/createUser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<User[]> { 
    return this.httpClient.get<User[]>(`${API_URL}/API/User/GetAll`, { withCredentials: true });
  }

  getById(id : number) : Observable<User> { 
    return this.httpClient.get<User>(`${API_URL}/API/User/GetById`, { 
      params: { 
        "id": id
      }
    });
  }

  create(userModel : CreateUserModel) : Observable<boolean> {
    let username = userModel.username;
    let password = userModel.password;

    return this.httpClient.post<any>(`${API_URL}/API/User/Create`, 
    { username, password },
    { withCredentials: true });
  }

  delete(id : number) : Observable<boolean> {
    return this.httpClient.delete<any>(`${API_URL}/API/User/Delete/${id}`, 
    { withCredentials: true });
  }
}
