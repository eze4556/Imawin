import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  navigateToAgente() {
    this.router.navigate(['agentePerfil']); // Navega a la ruta 'playerProfile'
  }

}
