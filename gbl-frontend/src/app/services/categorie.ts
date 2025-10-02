import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CategorieType {
  id?: number;
  nom: string;
  livres?: any[]; // tu peux remplacer any[] par LivreType[] si tu veux plus strict
}

@Injectable({ providedIn: 'root' })
export class Categorie {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getAll(): Observable<CategorieType[]> {
    return this.http.get<CategorieType[]>(this.apiUrl);
  }

  // Récupérer une catégorie par ID
  get(id: number): Observable<CategorieType> {
    return this.http.get<CategorieType>(`${this.apiUrl}/${id}`);
  }

  // Créer une catégorie
  create(c: CategorieType): Observable<CategorieType> {
    return this.http.post<CategorieType>(this.apiUrl, c);
  }

  // Mettre à jour une catégorie
  update(id: number, c: CategorieType): Observable<CategorieType> {
    return this.http.put<CategorieType>(`${this.apiUrl}/${id}`, c);
  }

  // Supprimer une catégorie
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Recherche par nom
  search(query: string): Observable<CategorieType[]> {
    return this.http.get<CategorieType[]>(`${this.apiUrl}/search?q=${query}`);
  }
}
