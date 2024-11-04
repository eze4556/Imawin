import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.css']
})
export class ClubesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    navigateToAgente() {
    this.router.navigate(['profileClub']); // Navega a la ruta 'playerProfile'
  }

}
