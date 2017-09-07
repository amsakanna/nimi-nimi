import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService, PictureService, IndexService } from '../services/all-data.service'
import { SORT, FILTER } from '../app.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Picture } from '../models/picture.model';
import { Index } from '../models/index.model';
import { g } from '../app.global';

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

	productStream: Observable<Product[]>;
	productList: Product[];
	pictureStream: Observable<Picture[]>;
	searchKey: string;
	searchKeySub: Subscription;

  	ngOnInit() {}
	constructor(private route: ActivatedRoute,
				private router: Router,
				private productService: ProductService,
				private pictureService: PictureService,
				private indexService: IndexService)
	{
		this.searchKeySub = this.route.queryParams.subscribe( params => 
		{

			var keyword: string = params[ 'keyword' ] || '';
			this.searchKey = keyword.toLowerCase();
			this.productList = new Array<Product>();
			
			if( this.searchKey == '' )
			{				
				this.productService
				.getList( SORT.NONE, FILTER.NONE )
				.subscribe( productList => productList.forEach( product => {
					// get pictures for product
					this.pictureService
					.getObject( product.picture.$key )
					.subscribe( picture => {
						product.picture = picture;
						this.productList.push( product );
					});
				}));
			}
			else
			{				
				this.indexService
				.getObject( this.searchKey )
				.subscribe( index => {
					if( !index || !index.matchList || index.matchList.length <= 0 )
						return;
					// get all matches
					var i: number = 0;
					index.matchList
					.filter( match => match.subject == 'Product' )
					.forEach( match => {
						// get product
						this.productService
						.getObject( match.subjectKey )
						.subscribe( product => {
							// get pictures for product
							this.pictureService
							.getObject( product.picture.$key )
							.subscribe( picture => {
								product.picture = picture;
								this.productList.push( product );
							});
						});
					});
				});
			}
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
