import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieType } from './categorie';
import { environment } from '../../environments/environment';

// Interface pour représenter un livre complet
export interface LivreType {
  id?: number;
  titre: string;
  auteur: string;
  datePublication?: string;
  isbn?: string;
  description?: string;
  categorie?: CategorieType; // une seule catégorie maintenant
}

// DTO pour créer ou mettre à jour un livre
export interface LivreDTO {
  titre: string;
  auteur: string;
  datePublication?: string;
  isbn?: string;
  description?: string;
  categorieId: number; // un seul id
}

@Injectable({ providedIn: 'root' })
export class Livre {
  private apiUrl = `${environment.apiUrl}/livres`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les livres
  getAll(): Observable<LivreType[]> {
    return this.http.get<LivreType[]>(this.apiUrl);
  }

  // Récupérer un livre par ID
  get(id: number): Observable<LivreType> {
    return this.http.get<LivreType>(`${this.apiUrl}/${id}`);
  }

  // Créer un livre
  create(dto: LivreDTO): Observable<LivreType> {
    return this.http.post<LivreType>(this.apiUrl, dto);
  }

  // Mettre à jour un livre
  update(id: number, dto: LivreDTO): Observable<LivreType> {
    return this.http.put<LivreType>(`${this.apiUrl}/${id}`, dto);
  }

  // Supprimer un livre
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Recherche par titre ou auteur
  search(query: string): Observable<LivreType[]> {
    return this.http.get<LivreType[]>(`${this.apiUrl}/search?q=${query}`);
  }

  getAllPaged(page: number, size: number, sortBy: string, direction: string) {
    return this.http.get<any>(
      `${this.apiUrl}/paged?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );
  }

  searchPaged(query: string, page: number, size: number, sortBy: string, direction: string) {
    return this.http.get<any>(
      `${this.apiUrl}/search-paged?q=${query}&page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );
  }
}
