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
    let url = 'https://localhost:7248/api/Payment/Payment'
    this.http.get<string>(url).subscribe({
      next:(response) => this.orderId = response
    })
  }

  payWithRazor() {
    let options = {
      "key": "YOUR_RAZORPAY_KEY", // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Your Company Name",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "ORDER_ID", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response:any){
          // Handle the payment success
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
