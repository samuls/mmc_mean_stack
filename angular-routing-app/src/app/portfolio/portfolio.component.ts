import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  id: any = null;
  action: any;
  constructor(private ac: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.ac.snapshot.params['id'];
    this.action = this.ac.snapshot.params['action'];
  }
}
