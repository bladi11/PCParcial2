import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  aboutMe: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'https://api.miapp.com/users';  // URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/current`);
  }

  // Actualizar el perfil del usuario
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/current`, user);
  }
}

