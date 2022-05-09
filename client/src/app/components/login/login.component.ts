import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  response: any;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UsersService) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }
  submit() {
    
    this.userService.login(this.form.value).subscribe((resp: any) => {
      if (resp.error) {
        this.response = resp;
      } else {
        localStorage.setItem("logsViewer_token", resp.data.token)
        this.router.navigate([""], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
  }

}
