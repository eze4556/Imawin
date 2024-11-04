import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dts',
  templateUrl: './dts.component.html',
  styleUrls: ['./dts.component.css']
})
export class DtsComponent implements OnInit {

    constructor(private router: Router) { }

  ngOnInit() {
  }

   navigateToAgente() {
    this.router.navigate(['profileDt']); // Navega a la ruta 'playerProfile'
  }

}
