import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserSelector } from './state/user.selector';
import { User, UserModel } from './state/user.model';
import { LoadUsers } from './state/user.action';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { NutrientsTableComponent } from "../nutrients-table/nutrients-table.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NutrientsTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  users$: Observable<UserModel[]> = inject(Store).select(UserSelector.getUser);
  users: User[] = [];
  constructor(private store: Store, private userService: UserService) {  

  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
    this.users$.subscribe(((users) => {
      if(users == null) {
        return;
      }
      this.users = [];
      this.users = users.map((userMode)=> {
        return this.userService.convertModelToUser(userMode);
      })
    }))
  }
}
