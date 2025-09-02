import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../../core/models/navbar-link.model';
import { NavbarService } from '../../../core/services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  cadastroLinks: NavLink[] = [];
  agendamentoLinks: NavLink[] = [];

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.cadastroLinks = this.navbarService.getCadastroLinks();
    this.agendamentoLinks = this.navbarService.getAgendamentoLinks();
  }

  getUserName(): string {
    return "Marcia Pereira";
  }

  isAdmin():boolean{
    return true;
  }

  logout(){
    console.log("logout");
  }
}