import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
})
export class NotificationBellComponent {
  notices = [
    { title: 'Notice 1', description: 'Description for notice 1' },
    { title: 'Notice 2', description: 'Description for notice 2' },
  ];
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;
  overlayRef!: OverlayRef;
  @ViewChild('bellIcon', { read: ElementRef }) bellIcon!: ElementRef;
  pendingNoticesCount = 3;
  backdropClickSubscription!: Subscription;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    public authService: AuthService
  ) {}

  navigateToNoticeDetail() {
    this.router.navigate(['/notice-detail']);
  }

  closeNoticeDetails(): void {
    this.overlayRef.detach();
  }

  toggleNoticeDetails(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.bellIcon)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
          },
        ]);
      this.overlayRef = this.overlay.create({
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'transparent-backdrop',
      });
      this.backdropClickSubscription = this.overlayRef
        .backdropClick()
        .subscribe(() => {
          this.overlayRef.detach();
        });
      const overlayPortal = new TemplatePortal(
        this.overlayTemplate,
        this.viewContainerRef
      );
      this.overlayRef.attach(overlayPortal);
    }
  }
  ngOnDestroy(): void {
    this.backdropClickSubscription?.unsubscribe();
    this.overlayRef?.dispose();
  }
}
