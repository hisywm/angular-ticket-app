import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Subcategory } from '../models/Subcategory';
const categories: Category[] = [
  { id: 1, name: 'Internet' },
  { id: 2, name: 'Report A Bug' },
  { id: 3, name: 'General Question' },
];
const subcategories: Subcategory[] = [
  { id: 1, name: 'Internet 1', categoryId: 1 },
  { id: 2, name: 'Internet 2', categoryId: 1 },
  { id: 3, name: 'Internet 3', categoryId: 1 },
  { id: 6, name: 'Report A Bug 1', categoryId: 2 },
  { id: 7, name: 'Report A Bug 2', categoryId: 2 },
  { id: 8, name: 'Report A Bug 3', categoryId: 2 },
  { id: 10, name: 'General Question 1', categoryId: 3 },
  { id: 11, name: 'General Question 2', categoryId: 3 },
  { id: 12, name: 'General Question 3', categoryId: 3 },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  fetchCategories() {
    return categories;
  }

  fetchSubcategories(categoryId: any) {
    return subcategories.filter(
      (subcategories) => subcategories.categoryId === categoryId
    );
  }
}
