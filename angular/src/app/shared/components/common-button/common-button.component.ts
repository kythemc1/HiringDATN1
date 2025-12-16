import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalListManager } from '../../utils/header-single-page';


@Component({
  selector: 'vt-button',
  standalone: false,
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonButtonComponent {
  listManager = GlobalListManager;
  @Input() label = 'Button';
  @Input() color: string = 'primary';
  @Input() width?: string | number;
  @Input() height?: string | number;
  @Input() inline = false;
  @Input() outline = false;
  @Input() disabled = false;
  @Input() title :string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  // Auto-breadcrumb support
  @Input() breadcrumb: boolean = false;
  @Input() breadcrumbText?: string;
  @Input() breadcrumbMode?: 'create';
  @Input() breadcrumbEntity?: string;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  private colorMap: Record<string, string> = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529',
    custom:'#1D469E',
    yellow:"#F79009",
  };

  get normalizedColor(): string {
    const c = (this.color || '').toLowerCase().trim();
    return this.colorMap[c] ?? this.color ?? this.colorMap['primary'];
  }

  get computedStyles(): { [key: string]: any } {
    const color = this.normalizedColor;
    const w = this.parseSize(this.width);
    const h = this.parseSize(this.height);

    const styles: any = {
      display: this.inline ? 'inline-flex' : 'flex',
      width: w,
      height: h ?? undefined,
      backgroundColor: this.outline ? 'transparent' : color,
      color: this.outline ? color : (this.isLightColor(color) ? '#000' : '#fff'),
      border: `1px solid ${color}`,
    };

    return styles;
  }

  onClick(evt: MouseEvent) {
    if (this.disabled) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }

    const autoText = this.buildBreadcrumbText();
    if (autoText) {
      this.listManager.add(autoText);
    }

    this.buttonClick.emit(evt);
  }

  private parseSize(val?: string | number): string | undefined {
    if (val === undefined || val === null) return undefined;
    if (typeof val === 'number') return `${val}px`;
    const s = String(val).trim();
    if (/^\d+$/.test(s)) {
      return `${s}px`;
    }
    return s;
  }

  private isLightColor(color: string): boolean {
    // Determine if color is light (hex only). If not hex, assume dark for contrast.
    const hex = color.startsWith('#') ? color.substring(1) : null;
    if (hex && (hex.length === 3 || hex.length === 6)) {
      const h = hex.length === 3 ? hex.split('').map(ch => ch + ch).join('') : hex;
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 186; // threshold for readability
    }
    return false;
  }

  private buildBreadcrumbText(): string | null {
    if (!this.breadcrumb) return null;
    if (this.breadcrumbText && this.breadcrumbText.trim()) return this.breadcrumbText.trim();
    const entity = (this.breadcrumbEntity || '').trim();
    const suffix = entity ? ` ${entity}` : '';
    switch (this.breadcrumbMode) {
      case 'create':
        return `Thêm mới${suffix}`;
      default:
        return this.title || this.label || null;
    }
  }
}
