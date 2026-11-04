import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../core/constants/cloudinary-assets.manifest';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { WhatsappPipe } from '../../../core/i18n/whatsapp.pipe';
import { ChatService } from '../../../shared/services/chat';
import { I18nService } from '../../../core/i18n/i18n.service';

/**
 * Vista de Contacto y Agendamiento de Valoración Privada.
 * Proporciona acceso directo vía WhatsApp Concierge y un formulario
 * de agendamiento simplificado sin requerir registros ni inicios de sesión.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslocoPipe, WhatsappPipe, IconComponent, CommonModule, FormsModule, LuxuryButtonComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly i18n = inject(I18nService);
  protected readonly chat = inject(ChatService);
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultTall;

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


  /** Escapa texto del usuario antes de insertarlo en un mensaje traducido con HTML (`[innerHTML]`). */
  protected esc(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
