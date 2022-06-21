import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

const categories: Category[] = [
  { id: 1, name: 'Internet' },
  { id: 2, name: 'Report A Bug' },
  { id: 3, name: 'General Question' },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  fetchCategories() {
    return categories;
  }
}
