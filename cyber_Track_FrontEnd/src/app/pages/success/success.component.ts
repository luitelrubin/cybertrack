import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatCardModule],
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  timeLeft: number = 10;
  interval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        this.router.navigate(['/home']);
      }
    }, 1000);
  }
}