import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenStrorageService: TokenStorageService){}
  ngOnInit():void{
    this.isLoggedIn = !!this.tokenStrorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStrorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }
  logout(): void{
    this.tokenStrorageService.signOut();
    window.location.reload();
  }
  title = 'angular-13-jwt-auth';
}
