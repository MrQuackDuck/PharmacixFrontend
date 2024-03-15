import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicament } from '../models/medicament';
import { API_URL } from 'src/globals';
import { CreateMedicamentModel } from '../models/requestModels/createMedicament';
import { EditMedicamentModel } from '../models/requestModels/editMedicament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentRepositoryService {
  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Medicament[]> { 
    return this.httpClient.get<Medicament[]>(`${API_URL}/API/Medicament/GetAll`, { withCredentials: true });
  }

  getById(id : number) : Observable<Medicament> { 
    return this.httpClient.get<Medicament>(`${API_URL}/API/Medicament/GetById`, { 
      params: { 
        "id": id
      }
    });
  }

  create(medicamentModel : CreateMedicamentModel) : Observable<boolean> {
    let title = medicamentModel.title;
    let amount = medicamentModel.amount;
    let price = medicamentModel.price;
    let categoryId = medicamentModel.categoryId;

    return this.httpClient.post<any>(`${API_URL}/API/Medicament/Create`, 
    { title, amount, price, categoryId },
    { withCredentials: true });
  }

  edit(medicamentModel : EditMedicamentModel) : Observable<boolean> {
    let id = medicamentModel.id;
    let title = medicamentModel.title;
    let amount = medicamentModel.amount;
    let price = medicamentModel.price;
    let categoryId = medicamentModel.categoryId;

    return this.httpClient.post<any>(`${API_URL}/API/Medicament/Edit`, 
    { id, title, amount, price, categoryId },
    { withCredentials: true });
  }

  delete(id : number) : Observable<boolean> { 
    return this.httpClient.get<any>(`${API_URL}/API/Medicament/Delete`, { 
      params: { 
        "id": id
      }, withCredentials: true
    })
  }
}
