import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { g } from "app/app.global";

@Injectable()
export class MetadataService
{

	public metadata: any;
	
	getData() : Observable<any> {
		return this.db.object( 'Metadata' );
	}

	constructor(private db: AngularFireDatabase)
	{
		const table = this.db.object( 'Metadata' );

		async function getMetadata() : Promise<any>
		{			
			// var h = await table.toPromise<any>();
			// return h;
			return await Promise
			.resolve(1)
			.then( metadata => {
				g.METADATA = metadata;
				g.app.loaded = true;
			});
		}
		
		// getMetadata();

	}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, 
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{		

		return this
			.getData()
			.map( metadata => {
				g.METADATA = metadata;
				return true;
			});			
		
	}
	


}