import { Injectable } from '@angular/core';
import { MedicamentCategory } from '../models/medicamentCategory';
import { API_URL } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { CreateMedicamentCategoryModel } from '../models/requestModels/createMedicamentCategory';
import { EditMedicamentCategoryModel } from '../models/requestModels/editMedicamentCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentCategoryRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<MedicamentCategory[]> { 
    return this.httpClient.get<MedicamentCategory[]>(`${API_URL}/API/MedicamentCategory/GetAll`, { withCredentials: true });
  }

  getById(id : number) : Observable<MedicamentCategory> { 
    return this.httpClient.get<MedicamentCategory>(`${API_URL}/API/MedicamentCategory/GetById`, { 
      params: { 
        "id": id
      } 
    });
  }

  create(medicamentCategoryModel : CreateMedicamentCategoryModel) : Observable<boolean> {
    let name = medicamentCategoryModel.name;

    return this.httpClient.post<any>(`${API_URL}/API/MedicamentCategory/Create`, 
    { name },
    { withCredentials: true });
  }

  edit(medicamentCategoryModel : EditMedicamentCategoryModel) : Observable<boolean> {
    let id = medicamentCategoryModel.id;
    let name = medicamentCategoryModel.name;

    return this.httpClient.put<any>(`${API_URL}/API/MedicamentCategory/Edit`, 
    { id, name },
    { withCredentials: true });
  }

  delete(id : number) : Observable<boolean> {
    return this.httpClient.delete<any>(`${API_URL}/API/MedicamentCategory/Delete/${id}`, 
    { withCredentials: true });
  }
}
