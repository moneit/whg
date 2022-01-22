import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

import { environment } from '@env';
import { ResponseStatusEnum } from '@shared/enums/response-status.enum';
import { ActionDesc } from '@shared/interfaces/action-desc.interface';
import { ApiResponse } from '@shared/interfaces/api-response.interface';
import { ApiStatus } from '@shared/interfaces/api-status.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public headers: HttpHeaders;
  public apiResultBehavior: BehaviorSubject<ApiStatus | undefined> = new BehaviorSubject<ApiStatus | undefined>(undefined);
  public apiResult: Observable<ApiStatus | undefined>;

  constructor(
    protected http: HttpClient,
    protected spinner: NgxSpinnerService,
    protected toastService: ToastrService,
) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');

    this.apiResult = this.apiResultBehavior.asObservable();
  }

  public responseToast<T = string>(res: any, url: string = '', requestType: string = '', action?: ActionDesc): void {
    const method = requestType.toUpperCase();
    if (method === 'GET') { return; }

    const { status, data, errorMessage } = res as ApiResponse<T>;

    if (status === ResponseStatusEnum.Success) {
      if (action) {
        this.toastService.success(action?.success);
      }
    } else {
      if (errorMessage) {
        this.toastService.error(errorMessage, action?.failure);
      } else if (action) {
        this.toastService.success(action?.failure);
      }
    }
  }

  protected get<T = any>(url: string, action?: ActionDesc, hasSpinner: boolean = false, params: any = {}, options: any = {}): Observable<T> {
    return this.request<T>('get', url, {headers: this.headers, ...options, params}, hasSpinner, action);
  }

  protected request<T = any>(method: string, url: string, options: any = {}, hasSpinner: boolean = false, action?: ActionDesc): Observable<any> {
    if (hasSpinner) {
      this.spinner.show().then();
    }

    return new Observable((observer: Subscriber<any>): void => {
      this.http.request<T>(method, url, options)
        .subscribe(
          (response: HttpEvent<T>) => {
            if (action) {
              this.responseToast<T>(response, url, method, action);
            }
            observer.next(response);
            observer.complete();

            if (hasSpinner) {
              this.spinner.hide().then();
            }
          },
          (error: any) => {
            if (action) {
              this.toastService.error(action?.failure);
            } else {
              if (error.body) {
                const { status, data } = error.body;
                this.toastService.error(`${status} - ${data}`, url);
              } else {
                this.toastService.error(error.message, url);
              }
            }

            observer.error(error);
            observer.complete();
            if (hasSpinner) {
              this.spinner.hide().then();
            }
          });
    });
  }
}
