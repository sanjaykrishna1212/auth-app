import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    const clone = req.clone({ 
      headers: req.headers.set('x-auth-token', userData.token || '')
    });
    return next(clone);
  }
  return next(req);
};
