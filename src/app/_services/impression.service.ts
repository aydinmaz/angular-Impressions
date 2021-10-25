import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ImpressionService {
  constructor() {}

  data = [];

  uploadedFile(bstr: string): any {
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsName: string = wb.SheetNames[0];

    const ws: XLSX.WorkSheet = wb.Sheets[wsName];

    this.data = XLSX.utils.sheet_to_json(ws, { raw: true });
    return this.data;
  }
}
