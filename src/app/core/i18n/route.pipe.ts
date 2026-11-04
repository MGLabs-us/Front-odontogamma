import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';
import { RouteKey } from './route-map';

/**
 * Convierte una clave de ruta en la URL de ese idioma: `[routerLink]="'about' | route"`.
 * Para el detalle de un tratamiento se pasa el id: `'service-detail' | route: service.id`.
 * Es impura a propósito: se recalcula cuando cambia el idioma (lee la señal `lang`).
 */
@Pipe({ name: 'route', standalone: true, pure: false })
export class RoutePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  public transform(key: RouteKey, serviceId?: string): string {
    return key === 'service-detail' && serviceId
      ? this.i18n.serviceLink(serviceId)
      : this.i18n.link(key);
  }
}
