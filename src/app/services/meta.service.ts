import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { g } from "app/app.global";

@Injectable()
export class MetaService
{

	public loadStatus: ReplaySubject<boolean>;
	
	constructor(private db: AngularFireDatabase)
	{
		this.loadStatus = new ReplaySubject<boolean>();

		this.db.object( 'Metadata' )
		.subscribe( meta => {
			g.meta = meta;
			this.loadStatus.next( true );
		});	
	}

}