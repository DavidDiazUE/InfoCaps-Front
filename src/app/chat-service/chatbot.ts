import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  
  private apiKey = 'AIzaSyBYfOhxFJeJHyFQmBG4bkJhMhDSHSXV7Zk'; 

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    
    const body = {
      "contents": [
        {
          "parts": [
            {
              "text": message
            }
          ]
        }
      ]
    };

    const params = {
      key: this.apiKey
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Hacemos la petición POST
    return this.http.post(this.apiUrl, body, { headers: headers, params: params }).pipe(
      map((response: any) => {
        return response.candidates[0].content.parts[0].text;
      })
    );
  }
}