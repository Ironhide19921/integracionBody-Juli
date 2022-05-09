import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public logsService: LogsService, private router: Router, private route: ActivatedRoute) {
    if (localStorage.getItem("logsViewer_token") == null) {
      this.router.navigate(['login'], { relativeTo: this.route });
    }
  }
  files: object;
  type: string;
  getFiles(type: string) {

    this.type = type;
    switch (this.type) {
      case "console":
        this.type = "Console logs";
        break;
      case "error":
        this.type = "Error logs";
        break;
      case "response":
        this.type = "Api response logs";
        break;
    }

    this.logsService.getFileList(type).subscribe((resp: any) => {
      if (resp.error) {
        console.log("Ha ocurrido un error llamando a la api.");
        if (resp.message == "jwt expired") {
          this.router.navigate(['login'], { relativeTo: this.route });
        } else {
          alert(resp.message);
        }
      } else {
        console.log("Llamando a la api.", resp);
        this.files = resp.data;
      }
    });
  }

  ngOnInit(): void {
  }

}
