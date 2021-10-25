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

export interface CountPerHour {
  hour: string;
  count: number;
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
  impDataSource: CountPerHour[];

  isLoaded = false;
  isLoading = false;

  displayedColumnsImp: string[] = ['hour', 'count'];
  hours: CountPerHour[] = [
    { hour: '00 - 01', count: 0 },
    { hour: '01 - 02', count: 0 },
    { hour: '02 - 03', count: 0 },
    { hour: '03 - 04', count: 0 },
    { hour: '04 - 05', count: 0 },
    { hour: '05 - 06', count: 0 },
    { hour: '06 - 07', count: 0 },
    { hour: '07 - 08', count: 0 },
    { hour: '08 - 09', count: 0 },
    { hour: '09 - 10', count: 0 },
    { hour: '10 - 11', count: 0 },
    { hour: '11 - 12', count: 0 },
    { hour: '12 - 13', count: 0 },
    { hour: '13 - 14', count: 0 },
    { hour: '14 - 15', count: 0 },
    { hour: '15 - 16', count: 0 },
    { hour: '16 - 17', count: 0 },
    { hour: '17 - 18', count: 0 },
    { hour: '18 - 19', count: 0 },
    { hour: '19 - 20', count: 0 },
    { hour: '20 - 21', count: 0 },
    { hour: '21 - 22', count: 0 },
    { hour: '22 - 23', count: 0 },
    { hour: '23 - 24', count: 0 },
  ];

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
    this.impressions = 0;
    this.impDataSource = [];
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
    const id = this.deviceControl.value;
    let count = 0;
    this.data.forEach((element) => {
      if (element.device_id === id) {
        count++;
        this.countImpHourly(element);
      }
    });
    this.impressions = count;
    this.impDataSource = this.hours;
  }

  uploadedFile = (event: any) => {
    this.isLoading = true;
    const target: DataTransfer = event.target as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      this.data = this.service.uploadedFile(bstr);
      this.dataSource.data = this.data;
      this.isLoaded = true;
      this.isLoading = false;
      this.createIdArray();
      console.log('data', this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // count impressions per device per hour
  countImpHourly = (el: DeviceData) => {
    const impDate = new Date(el.timestamp).getHours();
    if (impDate < 1) {
      this.hours[0].count++;
    } else if (impDate < 2) {
      this.hours[1].count++;
    } else if (impDate < 3) {
      this.hours[2].count++;
    } else if (impDate < 4) {
      this.hours[3].count++;
    } else if (impDate < 5) {
      this.hours[4].count++;
    } else if (impDate < 6) {
      this.hours[5].count++;
    } else if (impDate < 7) {
      this.hours[6].count++;
    } else if (impDate < 8) {
      this.hours[7].count++;
    } else if (impDate < 9) {
      this.hours[8].count++;
    } else if (impDate < 10) {
      this.hours[9].count++;
    } else if (impDate < 11) {
      this.hours[10].count++;
    } else if (impDate < 12) {
      this.hours[11].count++;
    } else if (impDate < 13) {
      this.hours[12].count++;
    } else if (impDate < 14) {
      this.hours[13].count++;
    } else if (impDate < 15) {
      this.hours[14].count++;
    } else if (impDate < 16) {
      this.hours[15].count++;
    } else if (impDate < 17) {
      this.hours[16].count++;
    } else if (impDate < 18) {
      this.hours[17].count++;
    } else if (impDate < 19) {
      this.hours[18].count++;
    } else if (impDate < 20) {
      this.hours[19].count++;
    } else if (impDate < 21) {
      this.hours[20].count++;
    } else if (impDate < 22) {
      this.hours[21].count++;
    } else if (impDate < 23) {
      this.hours[22].count++;
    } else if (impDate < 24) {
      this.hours[23].count++;
    }
  }
}
