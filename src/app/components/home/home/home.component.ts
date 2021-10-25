import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  isLoaded = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private service: ImpressionService) {}

  ngOnInit(): void {}


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator || null;
  }


  uploadedFile = (event: any) => {
    const target: DataTransfer = event.target as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      this.data = this.service.uploadedFile(bstr);
      this.dataSource.data = this.data;
      this.isLoaded = true;
      console.log('data', this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
