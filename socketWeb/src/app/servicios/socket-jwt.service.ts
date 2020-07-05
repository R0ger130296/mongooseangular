import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
@Injectable()
export class SocketJWTService extends Socket{

  constructor() { 
    const token = JSON.parse(sessionStorage.getItem("token1"));
    console.log(Object.values(token))
    super({url:'http://localhost:3000',options:{
       query:`token=${token}`,
    }
  });
  }
}
