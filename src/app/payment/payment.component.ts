import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare const Razorpay: any; 
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  orderId:string =''
constructor(private http: HttpClient) {
 
}
  ngOnInit(): void {
    let url = 'https://localhost:7248/api/Payment/initialize?amount=50000'
    this.http.get<string>(url).subscribe({
      next:(response) => {this.orderId = response
      console.log(response);}
      
    })
    this.payWithRazor()
  }

  payWithRazor() {
    let options = {
      "key": "rzp_test_JAwkgU8QccgoVb", // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Your Company Name",
      "description": "Test Transaction",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8ya9YncOZfbiDJIlq8UDM5cEzz8TBd9eSMZm2UlyJQ&s",
      "order_id": this.orderId,
      "handler": (response:any) => {
        this.http.post('https://localhost:7248/api/Payment/confirm',response)
          console.log(response.razorpay_payment_id, response.razorpay_order_id,response.razorpay_signature);
          
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          // Verify payment on the backend
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };

    let rzp = new Razorpay(options);
    rzp.open();
  }


}
