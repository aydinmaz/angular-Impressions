import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-impressions',
  templateUrl: './impressions.component.html',
  styleUrls: ['./impressions.component.css'],
})
export class ImpressionsComponent implements OnInit {
  @Input() impressionsCount = 0;
  @Input() impDataSource = [];
  displayedColumnsImp: string[] = ['hour', 'count'];

  constructor() {}

  ngOnInit(): void {}

}
