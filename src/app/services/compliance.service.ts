import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {

   termsAndService:string=`<div class="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
  <h1 class="text-2xl font-bold mb-4">Privacy Policy</h1>
  
  <p class="mb-4">
    This Privacy Policy explains how Related Code Kft. (“we,” “us,” or “our”) collects, uses, and protects the personal information of users (“you” or “your”) when you access and use the SkillGPT website (“the Service”) available at <a href="https://skillgpt.online" class="text-blue-500 underline">https://skillgpt.online</a> domain. By using the Service, you agree to the terms and practices described in this Privacy Policy.
  </p>
  
  <h2 class="text-xl font-semibold mb-2">Information Collection and Use</h2>
  <p class="mb-4">
    To access and use the Service, you must be a registered user and at least 18 years old. You can sign up or log in using your email and password or your Google account. To make this more secure, we only use Google authentication.
  </p>
  <p class="mb-4">
    We only collect the minimum necessary personal data, which includes your email address. We do not collect any additional personal information unless required by law. We will never share this personal data with third parties except as necessary to comply with applicable laws.
  </p>

  <h2 class="text-xl font-semibold mb-2">Firebase Authentication and Firestore Database</h2>
  <p class="mb-4">
    We use Firebase Authentication, a Google product, for user authentication. Your authentication data is securely stored and managed by Firebase. For more information on how Firebase handles user data, please refer to their <a href="https://firebase.google.com/support/privacy" class="text-blue-500 underline">Privacy Policy</a>.
  </p>
  <p class="mb-4">
    User-entered and GPT API-generated data are stored in Neon Database, ensuring data security and integrity. Neon may collect certain data related to your activity on the Service, as outlined in their <a href="https://neon.tech/legal/privacy-policy" class="text-blue-500 underline">Privacy Policy</a>.
  </p>

  <h2 class="text-xl font-semibold mb-2">Free Service and Credits</h2>
  <p class="mb-4">
    Registered users can access the Service for free, but with certain limitations on usage time. If you wish to extend your usage beyond these limits, you will need to purchase credits.
  </p>
  <p class="mb-4">
    For payment processing, we utilize Razorpay, a secure and trusted payment platform. Razorpay may require additional personal information to complete transactions. We do not share any payment-related personal data with third parties, except as required by law, such as tax obligations.
  </p>

  <h2 class="text-xl font-semibold mb-2">Transfer of User-Entered Information</h2>
  <p class="mb-4">
    We integrate several advanced AI technologies, including OpenAI, to enhance the capabilities of our Service. These technologies assist in content generation and provide personalized user experiences.
  </p>

  <h2 class="text-xl font-semibold mb-2">OpenAI API</h2>
  <p class="mb-4">
    We utilize OpenAI\’s API to generate detailed responses and content. OpenAI prioritizes the privacy and security of your data. For more information on OpenAI’s data handling practices, please refer to their <a href="https://openai.com/policies/privacy-policy" class="text-blue-500 underline">Privacy Policy</a>.
  </p>
  <p class="mb-4">
    By using our Service, you consent to the processing of your data by these APIs as described in their respective privacy policies.
  </p>

  <h2 class="text-xl font-semibold mb-2">Error Tracking and Performance Monitoring</h2>
  <p class="mb-4">
    We will be extending this in the coming days.
  </p>

  <h2 class="text-xl font-semibold mb-2">Website Hosting and Analytics</h2>
  <p class="mb-4">
    Our website is hosted on Netlify, a reliable hosting service. Netlify may collect certain data for analytics purposes. Please note that Netlify analytics may utilize cookies to track user activity. We do not use any cookies on our website.
  </p>
  <p class="mb-4">
    Our Private API is hosted on Render. Render provides secure and scalable infrastructure for our API services. Render may collect certain data related to server performance, network activity, and user interactions with our API.
  </p>

  <h2 class="text-xl font-semibold mb-2">Data Retention and Deletion</h2>
  <p class="mb-4">
    We retain your personal data only as long as necessary to provide our Service or as required by law. Typically, this includes data such as your email, full name, and any user-generated content.
  </p>
  <p class="mb-4">
    If you deactivate your account, we will delete your personal data within a reasonable time unless we are required to retain it for legal reasons. Any payment information processed by RazorPay is retained according to RazorPay’s policies.
  </p>
  <p class="mb-4">
    You can request the deletion of your data at any time by contacting us at <a href="mailto:users.helpandcare@gmail.com" class="text-blue-500 underline">users.helpandcare@gmail.com</a>. We will comply with your request unless we are legally obligated to retain the data.
  </p>
  <p class="mb-4">
    For any questions regarding data retention and deletion, please contact us.
  </p>

  <h2 class="text-xl font-semibold mb-2">Contact Information</h2>
  <p class="mb-4">
    If you have any questions, concerns, or requests regarding this Privacy Policy or the processing of your personal information, please contact us at:
  </p>
  <address class="mb-4">
    Skill GPT<br>
    Address: &nbsp;Noida,&nbsp;Uttar Pradesh,&nbsp;India(Republic of Bharat).<br>
    Email: <a href="mailto:info@relatedcode.com" class="text-blue-500 underline">users.helpandcare@gmail.com</a>
  </address>
  
  <p class="mb-4">
    We are committed to protecting your privacy and ensuring the security of your personal information. We may update this Privacy Policy from time to time, and any changes will be posted on this page.
  </p>
  
  <p class="text-sm text-gray-500">Last updated: 30 Aug 2024</p>
</div>
`
   refundPolicy:string=`<div class="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-10">
  <h1 class="text-2xl font-semibold text-gray-800 mb-4">Refund Policy for SkillGPT</h1>
  
  <p class="text-gray-700 mb-6">
    At SkillGPT, we strive to ensure that your experience with our platform is seamless and satisfactory. Our refund policy is designed to address any issues related to payment processing.
  </p>
  
  <h2 class="text-xl font-semibold text-gray-800 mb-3">1. Refund Policy:</h2>
  <p class="text-gray-700 mb-6">
    Once credits have been successfully added to your SkillGPT account, refunds cannot be issued, as the credits are considered delivered and available for use.
  </p>
  
  <h2 class="text-xl font-semibold text-gray-800 mb-3">2. Failed Transactions:</h2>
  <p class="text-gray-700 mb-6">
    If your payment has been debited from your account but the credits have not been reflected in your SkillGPT account, we will promptly address this issue.
  </p>
  
  <h2 class="text-xl font-semibold text-gray-800 mb-3">3. How to Request a Refund:</h2>
  <p class="text-gray-700 mb-4">
    In the event of a failed transaction where credits are not added to your account, please contact our support team at 
    <a href="mailto:users.helpandcare@gmail.com" class="text-teal-600 font-medium">users.helpandcare@gmail.com</a>. 
    Provide the following details in your email to help us resolve the issue quickly:
  </p>
  <ul class="list-disc list-inside text-gray-700 mb-6">
    <li><strong>Transaction ID</strong></li>
    <li><strong>Transaction Date and Time</strong></li>
    <li><strong>Amount Debited</strong></li>
    <li><strong>Current Credit</strong></li>
    <li><strong>Registered Email Address</strong> (the one associated with your SkillGPT account)</li>
  </ul>
  
  <p class="text-gray-700">
    Our support team will review your request and, if eligible, initiate a refund or credit the missing amount to your account as soon as possible.
  </p>
  
  <p class="text-gray-700 mt-6">
    We appreciate your understanding and patience. Your satisfaction is our priority, and we are committed to resolving any payment-related issues efficiently.
  </p>
  <p class="mt-3 text-sm text-gray-500">Last updated: 30 Aug 2024</p>
</div>
`

  getContent(route: string): string {
    switch(route) {
      case 'privacy-policy':
        return this.termsAndService;
      case 'refund-policy':
        return this.refundPolicy;
      default:
        return '<h1>404</h1><p>Route not found</p>';
    }
  }

  constructor() { }
}
