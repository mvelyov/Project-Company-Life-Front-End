import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { FileDropDirective, FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { LoginService } from '../../core/login/login.service';
import { CreateApplicationService } from './../../core/job-application/create-application.service';

const URL = 'C:/Users/ACER/Desktop/frond-end-company-life-storage';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss'],
})
export class JobApplicationComponent implements OnInit {
  public title: any;
  public jobId: any;
  public selectedCV: any = null;
  public selectedCoverLetter: any = null;
  public userId: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private createService: CreateApplicationService,
              private loginService: LoginService) {
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.jobId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void {
    this.userId = this.loginService.giveDecoded().id;
    console.log(this.userId);
  }

  public onSelectedCV(event: any): void {
       this.selectedCV = event.target.files[0];
       console.log(this.selectedCV);
  }
  public onSelectedCoverLetter(event: any): void {
    this.selectedCoverLetter = event.target.files[0];
  }
  public acceptedFormat(): boolean {
    const acceptedTypes=['pdf','doc','docx'];
    const result = acceptedTypes.some((format)=> this.selectedCV.name.includes(format));
    return result;
  }
  public logForm(value: any): void {

    const formData = new FormData();
    formData.append('userId', this.userId);
    formData.append('title', this.title);
    formData.append('firstName', value.firstName);
    formData.append('lastName', value.lastName);
    formData.append('comment', value.comment);
    formData.append('cv', this.selectedCV);
    formData.append('coverLetter', this.selectedCoverLetter);
    formData.append('email', value.email);
    formData.append('jobId', this.jobId);
    this.createService.createApplication(formData);
    setTimeout(()=>{
      window.location.reload();
    })
 }
}
