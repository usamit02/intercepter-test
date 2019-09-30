import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIURL } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: string;
  constructor() { }
}
export class User {
  id: string = "";
  na: string = "ビジター";
  no: number = 0;
  p?: number = 0;
  upd?: Date;
  rev?: Date;
  direct?: string;
  black?: number = 0;
  rtc?: string = "";
}