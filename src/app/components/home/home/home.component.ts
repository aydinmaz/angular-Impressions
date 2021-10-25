import { Component, OnInit } from '@angular/core';
import { ImpressionService } from 'src/app/_services/impression.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data = [];
  constructor(private service: ImpressionService) {}

  ngOnInit(): void {}

  uploadedFile = (event: any) => {
    const target: DataTransfer = event.target as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      this.data = this.service.uploadedFile(bstr);
      console.log('data', this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
