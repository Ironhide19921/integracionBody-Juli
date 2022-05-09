import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }
  private setHeaders() {
    const token: string = localStorage.getItem("logsViewer_token");
    const header = { 'x-access-header': token };
    return header;
  }
  getFileList(type: string) {
    return this.http.get("/api/logs/files/" + type, { headers: this.setHeaders() });
  }
  getFileByName(name: string) {
    return this.http.get("/api/logs/file/" + name, { headers: this.setHeaders() });
  }
}
