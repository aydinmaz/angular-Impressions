import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ImpressionService } from 'src/app/_services/impression.service';

export interface DeviceData {
  device_id: number;
  lat: number;
  lng: number;
  timestamp: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // excel data table
  data: DeviceData[] = [];
  dataSource = new MatTableDataSource<DeviceData>();
  displayedColumns: string[] = ['id', 'lat', 'lang', 'time'];

  deviceControl = new FormControl('');
  filteredOptions: Observable<number[]>;

  // array for id  dropdown
  ids: number[] = [];
  impressions = 0;

  isLoaded = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private service: ImpressionService) {}

  ngOnInit(): void {
    this.filteredOptions = this.deviceControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator || null;
  }

  private _filter(value: number): number[] {
    // cast to string for convenience
    const sValue = value + '';
    return sValue.length > 0
      ? this.ids.filter((c) => c.toString().includes(sValue))
      : [];
  }

  // create simple number array for dropdown
  createIdArray = () => {
    this.data.forEach((e) => {
      if (!this.ids.includes(e.device_id)) {
        this.ids.push(e.device_id);
      }
    });
  }

  // count number of impressions per device
  countImp = () => {
    this.impressions = 0;
    const id = this.deviceControl.value;
    let count = 0;
    this.data.forEach((element) => {
      if (element.device_id === id) {
        count++;
      }
    });
    this.impressions = count;
  }

  uploadedFile = (event: any) => {
    const target: DataTransfer = event.target as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      this.data = this.service.uploadedFile(bstr);
      this.dataSource.data = this.data;
      this.isLoaded = true;
      this.createIdArray();
      console.log('data', this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
