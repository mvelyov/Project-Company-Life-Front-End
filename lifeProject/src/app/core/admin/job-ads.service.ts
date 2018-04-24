import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IJobAds } from '../../models/job-ads';
import { RequesterService } from '../requester/requester.service';

@Injectable()
export class JobAdsService {

  constructor(private readonly requester: RequesterService) {
   }

  public getAllJobAds(): Observable<IJobAds[]> {
    return this.requester.get('/api/jobads');
   }
}
