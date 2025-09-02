import { Injectable } from '@angular/core';
import { NavLink } from '../models/navbar-link.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  getCadastroLinks(): NavLink[] {
    return [
      { label: 'Áreas', path: '/cadastros/areas' },
      { label: 'Profissionais', path: '/cadastros/profissionais' },
      { label: 'Tipos de Atendimento', path: '/cadastros/tipos-atendimento' },
      { divider: true },
      { label: 'Clientes', path: '/cadastros/clientes' },
      { divider: true },
      { label: 'Usuários', path: '/cadastros/usuarios' },
    ];
  }
  
  getAgendamentoLinks(): NavLink[] {
    return [
      { label: 'Hoje', path: '/agendamentos/hoje' },
      { label: 'Agendar', path: '/agendamentos/agendar' },
      { label: 'Cancelar', path: '/agendamentos/cancelar' },
      { divider: true },
      { label: 'Histórico do Cliente', path: '/agendamentos/historico-cliente' },
      { divider: true },
      { label: 'Agenda do Profissional', path: '/agendamentos/agenda-profissional' },
    ];
  }
}