import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserFormState } from 'src/app/entitites/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formState: UserFormState;
  userForm: FormGroup;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('id');
    if (idUser) {
      this.formState = UserFormState.Edit;
      this.userService.GetSingle(+idUser).subscribe(resp => {
        this.user = resp.data;
        this.userForm = this.formBuilder.group({
          first_name: [this.user.first_name, Validators.required],
          last_name: [this.user.last_name, Validators.required],
          email: [this.user.email, Validators.required]
        });
      })
    } else {
      this.formState = UserFormState.New;
      this.user = {
        first_name: "",
        last_name: "",
        email:"",
        avatar: "",
        id: 0
      }
      this.userForm = this.formBuilder.group({
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", Validators.required]
      });
    }
  }

  update(){
    this.user = {
      ...this.user,
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      email: this.userForm.value.email,
    }
    this.userService.Update(this.user).subscribe(resp => {
      //Instead of using an alert we could use MaterialDialog, but because of time I used this
      alert('The user has been updated successfully') //The list on the other page does't reach for an actual database where this is updated, so we can't see the actual user updated when we return
      this.router.navigate(['/list'])
    })
  }

  register(){
    this.user = {
      ...this.user,
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      email: this.userForm.value.email,
    }
    this.userService.Register(this.user).subscribe(resp => {
      alert('The user has been registered successfully') //Same for this
      this.router.navigate(['/list'])
    })
  }

}
