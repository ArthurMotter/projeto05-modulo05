import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessionalFormComponent } from '../professional-form/professional-form.component';
import { Area } from '../../../../core/models/area.model';
import { Professional } from '../../../../core/models/professional.model';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Page } from '../../../../core/models/page.model';

@Component({
  selector: 'app-professional-list',
  standalone: false,
  templateUrl: './Professional-list.component.html',
  styleUrls: ['./Professional-list.component.css']
})
export class ProfessionalListComponent implements OnInit {

  @ViewChild('formModal') formModal!: ModalComponent;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ModalComponent;
  @ViewChild(ProfessionalFormComponent) formComponent!: ProfessionalFormComponent;

  expandedProfessionalId: number | null = null;
  professionalToEdit?: Professional;
  professionalToDelete?: Professional;
  modalTitle = '';

  page: Page<Professional> | undefined;
  currentPage = 0;
  pageSize = 10;
  filterName = '';

  isLoading = true;

  constructor(
    private professionalService: ProfessionalService,
    private toastService: ToastService
  ) { }

  // Methods
  ngOnInit(): void {
    this.loadProfessionals();
  }

  loadProfessionals(): void {
    this.isLoading = true;
    this.professionalService.getProfissionais(this.currentPage, this.pageSize, this.filterName)
      .subscribe({
        next: (data) => {
          this.page = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error fetching professionals:", err);
          this.isLoading = false;
        }
      });
  }

  openModalForNew(): void {
    this.modalTitle = 'Novo Profissional';
    this.professionalToEdit = undefined;

    this.formComponent.resetForm();

    this.formModal.open();
  }

  openModalForEdit(Professional: Professional): void {
    this.modalTitle = 'Editar Profissional';
    this.professionalToEdit = Professional;
    this.formModal.open();
  }

  openDeleteConfirmation(Professional: Professional): void {
    this.professionalToDelete = Professional;
    this.deleteConfirmationModal.open();
  }

  toggleDetails(id: number): void {
    if (this.expandedProfessionalId === id) {
      this.expandedProfessionalId = null;
    } else {
      this.expandedProfessionalId = id;
    }
  }

  // Handlers
  handleSave(): void {
    this.formModal.close();
    this.loadProfessionals();
  }

  confirmDelete(): void {
    if (this.professionalToDelete) {
      this.professionalService.delete(this.professionalToDelete.id).subscribe({
        next: () => {
          this.toastService.showSuccess('Profissional excluído com sucesso!');
          this.loadProfessionals();
          this.deleteConfirmationModal.close();
        },
        error: (err) => {
          this.toastService.showError('Erro ao excluir Profissional.');
          console.error("Error deleting professional:", err);
          this.deleteConfirmationModal.close();
        }
      });
    }
  }

  onFilter(): void {
    this.currentPage = 0;
    this.loadProfessionals();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadProfessionals();
  }

  // Helpers
  getPageNumbers(): number[] {
    if (!this.page) {
      return [];
    }
    return Array.from({ length: this.page.totalPages }, (_, i) => i);
  }

  getAreaNames(areas: Area[]): string {
    if (!areas || areas.length === 0) {
      return 'N/A';
    }
    return areas.map(area => area.name).join(', ');
  }

}