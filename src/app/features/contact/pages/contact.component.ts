import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';

/**
 * Vista de Contacto y Agendamiento de Valoración Privada.
 * Proporciona acceso directo vía WhatsApp Concierge y un formulario
 * de agendamiento simplificado sin requerir registros ni inicios de sesión.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LuxuryButtonComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  protected readonly formSubmitted = signal<boolean>(false);

  protected formData = {
    name: '',
    phone: '',
    email: '',
    treatment: 'carillas',
    message: ''
  };

  protected onSubmit(): void {
    if (this.formData.name.trim() && this.formData.phone.trim()) {
      this.formSubmitted.set(true);
    }
  }

  protected resetForm(): void {
    this.formData = {
      name: '',
      phone: '',
      email: '',
      treatment: 'carillas',
      message: ''
    };
    this.formSubmitted.set(false);
  }
}
