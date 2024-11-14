export interface DtProfile {
  dt: 'Activo' | 'Inactivo';

  gusto: 'Ofensivo' | 'Defensivo' | 'Ambas' | 'Depende' ;
  country: string;
  province: string;
  playerName: string;
  lastClub: string;
  currentClub: string;
  age: any;
  height: any;
  yearsOfExperience: any;
  videoLink: string;
    profilePhotoUrl: string;
    detalle: string

}
