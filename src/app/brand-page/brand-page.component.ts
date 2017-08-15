import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandService } from '../services/all-data.service';
import { FILTER, SORT } from '../app.enum';

@Component({
	selector: 'app-brand-page',
	templateUrl: './brand-page.component.html',
	styleUrls: ['./brand-page.component.css']
})
export class BrandPageComponent implements OnInit {

	private brandStream: Observable<any[]>;

	constructor(private brandService: BrandService) {
		this.brandStream = this.brandService.getList(SORT.NONE, FILTER.NONE, undefined);
	}

	ngOnInit() {
	}

}
