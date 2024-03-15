import { MedicamentCategory } from "./medicamentCategory";

export class Medicament {
    id : number;
    title : string;
    amount : number;
    price : number;
    category : MedicamentCategory;
}