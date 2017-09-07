import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Account } from '../models/account.model';
import { Address } from '../models/address.model';
import { Brand } from '../models/brand.model';
import { Card } from '../models/card.model';
import { Department } from '../models/department.model';
import { Inventory } from '../models/inventory.model';
import { Journal } from '../models/journal.model';
import { Product } from '../models/product.model';
import { WishList } from '../models/wish-list.model';
import { Tag } from '../models/tag.model';
import { Picture } from '../models/picture.model';
import { Index } from '../models/index.model';
import { Color } from '../models/color.model';
import { Size } from '../models/size.model';
import { CartItem } from '../models/cart-item.model';
import { NavigationItem } from '../models/navigation-item.model';

@Injectable() export class IndexService extends DataService<Index> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Index { return new Index(json); } }
@Injectable() export class TagService extends DataService<Tag> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Tag { return new Tag(json); } }
@Injectable() export class ProductService extends DataService<Product> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Product { return new Product(json); } }
@Injectable() export class CartItemService extends DataService<CartItem> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : CartItem { return new CartItem(json); } }
@Injectable() export class AddressService extends DataService<Address> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Address { return new Address(json); } }
@Injectable() export class BrandService extends DataService<Brand> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Brand { return new Brand(json); } }
@Injectable() export class CardService extends DataService<Card> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Card { return new Card(json); } }
@Injectable() export class DepartmentService extends DataService<Department> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Department { return new Department(json); } }
@Injectable() export class WishListService extends DataService<WishList> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : WishList { return new WishList(json); } }
@Injectable() export class PictureService extends DataService<Picture> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Picture { return new Picture(json); } }
@Injectable() export class ColorService extends DataService<Color> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Color { return new Color(json); } }
@Injectable() export class SizeService extends DataService<Size> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Size { return new Size(json); } }
@Injectable() export class AccountService extends DataService<Account> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Account { return new Account(json); } }
@Injectable() export class JournalService extends DataService<Journal> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Journal { return new Journal(json); } }
@Injectable() export class InventoryService extends DataService<Inventory> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : Inventory { return new Inventory(json); } }
@Injectable() export class NavigationItemService extends DataService<NavigationItem> { constructor(db: AngularFireDatabase) { super(db); } protected createModel(json) : NavigationItem { return new NavigationItem(json); } }
