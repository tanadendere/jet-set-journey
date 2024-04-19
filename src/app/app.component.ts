import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'jet-set-journey';
  http = inject(HttpClient);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          name: user.displayName!,
          userId: user.uid!,
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
      console.log(this.authService.currentUserSignal());
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
