import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { User } from 'src/app/entitites/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public pageNumber: number = 1;

  public pageSize: number = 5;

  public total: number;

  public userList: Array<User>;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.userService.GetList({page: this.pageNumber, per_page: this.pageSize}).subscribe(resp => {//As next steps we could handle the list and other data with a Store, implementing NgRx or other libraries, did't do it because of lack of time
      this.total = resp.total;
      this.userList = resp.data
    });
  }

  handleChangePage(event: PageEvent){
    this.pageNumber = event.pageIndex + 1
    this.pageSize = event.pageSize
    this.getUserList();
  }

  edit(user: User){
    this.router.navigate(['/edit/',  user.id]);
  }

  newUser(){
    this.router.navigate(['/new/']);
  }

  delete(user: User){
    this.userService.Delete(user.id).subscribe(resp => {
      this.total--
      //This code will eliminate the user from the list but given that the services are not handling an actual database, then the user will reappear if you change pages
      this.userList.splice(this.userList.findIndex(u => u.id === user.id), 1)
    })
  }

}
