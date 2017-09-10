import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService, PictureService, IndexService, TileSizeService } from '../services/all-data.service'
import { SORT, FILTER } from '../app.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Picture } from '../models/picture.model';
import { Index } from '../models/index.model';
import { g } from '../app.global';
import { TileSize } from "../models/tile-size.model";
import { SpanningGrid } from "../models/spanning-grid.model";
import { List } from "../models/list.model";
import { Tile } from "app/models/tile.model";

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
	private grid: SpanningGrid;

	scrollme( event: MouseWheelEvent )
	{
		document.getElementById( 'product-grid-container' ).scrollLeft += event.deltaY;
	}

  	ngOnInit() {}
	constructor(private route: ActivatedRoute,
				private router: Router,
				private productService: ProductService,
				private pictureService: PictureService,
				private indexService: IndexService,
				private tileSizeService: TileSizeService)
	{

		this.grid = new SpanningGrid( 3, 0 , 180 );

		this.searchKeySub = this.route.queryParams.subscribe( params => 
		{

			var keyword: string = params[ 'keyword' ] || '';
			this.searchKey = keyword.toLowerCase();			

			if( this.searchKey == '' )
			{
				this.productService
				.getList( SORT.NONE, FILTER.NONE )
				.map( productList => {					
					return productList.map( product => {
						// get pictures for product
						this.pictureService
						.getObject( product.picture.$key )
						.subscribe( picture => { product.picture = picture; console.log( product ); } );
						// get tile size
						var tileSizeKey = product.rating == 5 ? 'popularProduct' : 'product';
						var tileSize = this.tileSizeService.list.find( item => item.$key == tileSizeKey );
						product.width = tileSize.width;
						product.height = tileSize.height;
						// var color = { r: Math.trunc( Math.random() * 1000) % 256, g: Math.trunc( Math.random() * 1000) % 256, b: Math.trunc( Math.random() * 1000) % 256 };
						return new Tile( { data: product, width: product.width, height: product.height } );
					});
				}).subscribe( tiles => {
					this.grid = new SpanningGrid( 3, 0 , 180 );
					tiles.forEach( tile => {
						this.grid.addTile( tile );
					});
				});
				// this.productService
				// .getList( SORT.NONE, FILTER.NONE )
				// .subscribe( productList => {
				// 	this.productList = new Array<Product>();
				// 	this.grid = new SpanningGrid( 3, 0 , 180 );
				// 	productList.forEach( product => {
				// 		// get tile size
				// 		var tileSizeKey = product.rating == 5 ? 'popularProduct' : 'product';
				// 		var tile = this.tileSizeService.list.find( item => item.$key == tileSizeKey );
				// 		product.width = tile.width;
				// 		product.height = tile.height;
				// 		this.grid.addTile( new Tile( { data: product, width: product.width, height: product.height } ) );
				// 		// get pictures for product
				// 		this.pictureService
				// 		.getObject( product.picture.$key )
				// 		.subscribe( picture => {
				// 			if( product.rating == 5 )
				// 				console.log( picture );
				// 			product.picture = picture;
				// 			this.productList.push( product );
				// 		});
				// 	});
				// 	console.log( this.grid.tiles );
				// });
			}
			else
			{				
				this.indexService
				.getObject( this.searchKey )
				.subscribe( index => {
					if( !index || !index.matchList || index.matchList.length <= 0 )
						return;
					// get all matches
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
