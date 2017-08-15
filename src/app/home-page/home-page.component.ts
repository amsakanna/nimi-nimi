import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FILTER, SORT } from '../app.enum';
import { TagService } from '../services/all-data.service';
import { Tag } from '../models/tag.model';
import { Router } from "@angular/router";

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	tagStream: Observable<Tag[]>;

	ngOnInit() {}
	constructor(private router: Router,
				private tagService: TagService) {
		this.tagStream = tagService.getList(SORT.NONE, FILTER.NONE);		
	}

	search(text)
	{		
		this.router.navigate(['/products'], { queryParams: { keyword: text } });
	}


}
