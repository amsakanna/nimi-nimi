import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService, PictureService, IndexService } from '../services/all-data.service'
import { SORT, FILTER } from '../app.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Picture } from '../models/picture.model';
import { Index } from '../models/index.model';

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

	private productStream: Observable<Product[]>;
	private productList: Product[];
	private pictureStream: Observable<Picture[]>;
	private searchKey: string;
	private searchKeySub: Subscription;

  	ngOnInit() {}
	constructor(private route: ActivatedRoute,
				private router: Router,
				private productService: ProductService,
				private pictureService: PictureService,
				private indexService: IndexService)
	{
		this.searchKeySub = this.route.queryParams.subscribe(params => 
		{
			var keyword: string = params[ 'keyword' ] || '';
			if( keyword == '' )
				alert('Enter some keywords to search');
			this.searchKey = keyword.toLowerCase();
			
			this.indexService
				.getObject( this.searchKey ).take(1)
				.subscribe( index => {
					this.productList = new Array<Product>();
					if( !index || !index.matchList || index.matchList.length <= 0 )
						return;
					// get all matches
					index.matchList
						.filter( match => match.subject == 'Product' )
						.forEach( match => {
							// get product
							this.productService
								.getObject( match.subjectKey ).take(1)
								.subscribe( product => {
									// get pictures for product
									this.pictureService
										.getObject( product.picture.$key ).take(1)
										.subscribe( picture => {
											product.picture = picture;
											this.productList.push( product );
										});
								});
						});
				})
		});
	}
 
	ngOnDestroy()
	{
		this.searchKeySub.unsubscribe();
	}

	select(product: Product)
	{
		this.router.navigateByUrl('/products/' + product.$key);
	}

}
