import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';

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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    aboutMe: ''
  };

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Llamada al servicio para obtener los datos del perfil
    this.userProfileService.getUserProfile().subscribe(
      (user: User) => this.user = user,
      (error) => console.error('Error al cargar el perfil del usuario', error)
    );
  }

  updateProfile() {
    // Llamada al servicio para actualizar el perfil del usuario
    this.userProfileService.updateUserProfile(this.user).subscribe(
      (response) => console.log('Perfil actualizado con éxito', response),
      (error) => console.error('Error al actualizar el perfil', error)
    );
  }
}
