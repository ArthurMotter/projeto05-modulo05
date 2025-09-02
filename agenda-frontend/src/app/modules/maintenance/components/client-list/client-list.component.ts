import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../../core/models/client.model';
import { Page } from '../../../../core/models/page.model';
import { ClientService } from '../../../../core/services/client.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @ViewChild('formModal') formModal!: ModalComponent;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ModalComponent;
  @ViewChild(ClientFormComponent) formComponent!: ClientFormComponent;
  
  expandedClientId: number | null = null;
  clientToEdit?: Client;
  clientToDelete?: Client;
  modalTitle = '';

  page!: Page<Client>;
  currentPage = 0;
  pageSize = 10;
  filterName = '';
  isLoading = true;

  constructor(
    private clientService: ClientService,
    private toastService: ToastService
  ) {
    this.page = this.getEmptyPage();
  }

  ngOnInit(): void {
    this.loadClients();
  }
  
  private getEmptyPage(): Page<Client> {
    return {
      content: [],
      pageable: {
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0, pageNumber: 0, pageSize: this.pageSize, paged: true, unpaged: false
      },
      last: true, totalPages: 0, totalElements: 0, size: this.pageSize,
      number: 0, sort: { sorted: false, unsorted: true, empty: true },
      first: true, numberOfElements: 0, empty: true
    };
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientService.getClientsPage(this.filterName, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.page = data;
          this.currentPage = data.number;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error fetching clients:", err);
          this.toastService.showError('Erro ao carregar clientes.');
          this.isLoading = false;
        }
      });
  }

  toggleDetails(id: number): void {
    if (this.expandedClientId === id) {
      this.expandedClientId = null;
    } else {
      this.expandedClientId = id;
    }
  }

  openModalForNew(): void {
    this.modalTitle = 'Novo Cliente';
    this.clientToEdit = undefined;
    if (this.formComponent) {
      this.formComponent.resetForm();
    }
    this.formModal.open();
  }

  openModalForEdit(client: Client): void {
    this.modalTitle = 'Editar Cliente';
    this.clientToEdit = client;
    this.formModal.open();
  }

  openDeleteConfirmation(client: Client): void {
    this.clientToDelete = client;
    this.deleteConfirmationModal.open();
  }

  handleSave(): void {
    this.formModal.close();
    this.loadClients();
  }

  confirmDelete(): void {
    if (this.clientToDelete) {
      this.clientService.delete(this.clientToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Cliente excluído com sucesso!');
          if (this.page.content.length === 1 && this.currentPage > 0) {
            this.currentPage--;
          }
          this.loadClients();
          this.deleteConfirmationModal.close();
        },
        error: (err) => {
          this.toastService.showError('Erro ao excluir cliente.');
          console.error("Error deleting client:", err);
          this.deleteConfirmationModal.close();
        }
      });
    }
  }

  onFilter(): void {
    this.currentPage = 0;
    this.loadClients();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadClients();
  }

  getPageNumbers(): number[] {
    if (!this.page || this.page.totalPages === 0) {
      return [];
    }
    return Array.from({ length: this.page.totalPages }, (_, i) => i);
  }
}