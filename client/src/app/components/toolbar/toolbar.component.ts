import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  logout() {
    localStorage.clear();
    this.router.navigate(["login"], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }

}
