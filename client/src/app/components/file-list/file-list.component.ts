import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  @Input() files: object;
  @Input() showTerminal: boolean;
  selectedFile: any;
  fileDate: string;
  fileContent: string;
  jsonFile: boolean;
  constructor(public logsService: LogsService) {

  }

  getFile(file: any) {

    this.showTerminal = true;
    this.selectedFile = file;
    console.log(this.selectedFile.date)
    this.logsService.getFileByName(this.selectedFile.name).subscribe((resp: any) => {
      console.log(resp);
      try {
        this.jsonFile = true;
        this.fileContent = JSON.parse(resp.data);
      } catch (err) {
        this.jsonFile = false;
        this.fileContent = resp.data;
      }
      this.scroll();
      this.fileDate = this.selectedFile.date;
    });
  }

  scroll() {
    let element = document.getElementById("anchor");
    element.scrollIntoView();

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  ngOnChanges(): void {
    this.showTerminal = false;
  }
  ngOnInit(): void {
    //this.showTerminal = false;
  }

}
