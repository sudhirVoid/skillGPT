import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {

   privacyPolicy:string=`<div class="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
  <h1 class="text-2xl font-bold mb-4">Privacy Policy</h1>
  
  <p class="mb-4">
    This Privacy Policy explains how Skill GPT (“we,” “us,” or “our”) collects, uses, and protects the personal information of users (“you” or “your”) when you access and use the SkillGPT website (“the Service”) available at <a href="https://skillgpt.online" class="text-blue-500 underline">https://skillgpt.online</a> domain. By using the Service, you agree to the terms and practices described in this Privacy Policy.
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
    Email: <a href="mailto:users.helpandcare@gmail.com" class="text-blue-500 underline">users.helpandcare@gmail.com</a>
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
   termOfService:string=`
    <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 class="text-2xl font-bold mb-4">Terms of Service</h1>
        
        <p class="mb-4">Welcome to Skill GPT ("Platform"). By accessing or using our Platform, you agree to the following Terms of Service ("Terms"). Please read them carefully.</p>

        <h2 class="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p class="mb-4">By registering, accessing, or using the Platform, you agree to be bound by these Terms, our Privacy Policy, and any additional guidelines or rules that may be posted. If you do not agree, please do not use our Platform.</p>

        <h2 class="text-xl font-semibold mb-2">2. User Eligibility</h2>
        <p class="mb-4">To use the Platform, you must be at least 18 years old and capable of forming a legally binding contract. Users under the age of 18 must have parental consent to use the Platform.</p>

        <h2 class="text-xl font-semibold mb-2">3. Account Registration</h2>
        <ul class="list-disc list-inside mb-4">
            <li>You are required to provide accurate and complete information during registration.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">4. Services Provided</h2>
        <p class="mb-4">Skill GPT offers a range of services designed to enhance your learning experience. These include:</p>
        <ul class="list-disc list-inside mb-4">
            <li><strong>AI-Generated Educational Content:</strong> Access a wide array of content generated by advanced AI models, tailored to various educational topics.</li>
            <li><strong>Personalized Learning Paths(Coming soon):</strong> Receive customized learning recommendations based on your preferences and progress.</li>
            <li><strong>Interactive Learning Tools(Coming soon):</strong> Utilize interactive features to engage with the content, including quizzes and exercises.</li>
            <li><strong>Analytics:</strong> Gain insights into your learning progress and performance .</li>
            <li><strong>Interactive Learning:</strong> Interact better with the learning content by having a conversation with AI to better understand the topic</li>
            
        </ul>

        <h2 class="text-xl font-semibold mb-2">5. Subscription and Payment Terms</h2>
        <ul class="list-disc list-inside mb-4">
            <li>Our services are provided on a subscription basis. Fees are detailed on our pricing page.</li>
            <li>Payments are non-refundable except as required by law or specified in these Terms.</li>
            <li>We reserve the right to change our subscription fees, but any changes will not affect your current billing cycle.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">6. User Conduct</h2>
        <ul class="list-disc list-inside mb-4">
            <li>Users agree to use the Platform in compliance with all applicable laws and regulations.</li>
            <li>Prohibited activities include, but are not limited to: unauthorized commercial use, sharing or distributing content without permission, reverse engineering the Platform, and engaging in any activity that could harm the Platform or its users.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">7. Content Ownership and Licensing</h2>
        <ul class="list-disc list-inside mb-4">
            <li>All AI-generated content remains the intellectual property of Skill GPT.</li>
            <li>You are granted a non-exclusive, non-transferable, revocable license to use the content for personal or educational purposes.</li>
            <li>Users may not reproduce, distribute, or sell content generated on the Platform.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">8. Data Privacy and Security</h2>
        <ul class="list-disc list-inside mb-4">
            <li>We are committed to protecting your personal data in accordance with our Privacy Policy.</li>
            <li>Users are responsible for ensuring the security of their own accounts.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">9. Termination of Service</h2>
        <ul class="list-disc list-inside mb-4">
            <li>We reserve the right to suspend or terminate your account if you violate these Terms or engage in activities that harm the Platform.</li>
            <li>Upon termination, your right to access the Platform will cease, but certain obligations under these Terms may continue.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
        <ul class="list-disc list-inside mb-4">
            <li>The Platform is provided "as is" without warranties of any kind, either express or implied.</li>
            <li>We are not liable for any damages arising from the use or inability to use the Platform, including but not limited to loss of data, loss of profits, or business interruption.</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">11. Indemnification</h2>
        <p class="mb-4">You agree to indemnify and hold harmless Skill GPT and its affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of the Platform or violation of these Terms.</p>

        <h2 class="text-xl font-semibold mb-2">12. Modifications to Terms</h2>
        <p class="mb-4">We may update these Terms periodically. You will be notified of any significant changes, and continued use of the Platform after such changes will constitute acceptance of the new Terms.</p>

       

        <h2 class="text-xl font-semibold mb-2">13. Contact Information</h2>
        <p>For any questions or concerns regarding these Terms, please contact us at <a href="mailto:users.helpandcare@gmail.com" class="text-blue-600 hover:underline">users.helpandcare@gmail.com</a>.</p>
        <p class="mb-4">we'll get back to you with help regarding your concern within 24 hours of query raised.</p>
    </div>


`;

shippingPolicy:string=`
<div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h1 class="text-2xl font-bold mb-4 text-gray-800">Shipping and Deliverance Policy</h1>
  
  <!-- Digital Product Delivery -->
  <div class="mb-6">
    <h2 class="text-xl font-semibold text-gray-700">1. Digital Product Delivery</h2>
    <p class="text-gray-600 mt-2">
      All purchases made on our platform are for digital credits. Upon successful payment, the credits will be automatically delivered to your account and will be available for immediate use. There is no physical shipment involved.
    </p>
  </div>

  <!-- Delivery Time -->
  <div class="mb-6">
    <h2 class="text-xl font-semibold text-gray-700">2. Delivery Time</h2>
    <p class="text-gray-600 mt-2">
      Digital credits are typically delivered instantly upon successful payment confirmation. In rare cases, there may be a delay of up to 10 minutes due to network or server issues. If you do not see the credits reflected in your account within this timeframe, please contact our support team at 
      <a href="mailto:users.helpandcare@gmail.com" class="text-blue-500 underline">users.helpandcare@gmail.com</a>.
    </p>
  </div>

  <!-- Confirmation Email -->
 

  <!-- Refunds and Cancellations -->
  <div class="mb-6">
    <h2 class="text-xl font-semibold text-gray-700">3. Refunds and Cancellations</h2>
    <p class="text-gray-600 mt-2">
      Since the product offered is digital in nature and is delivered instantly, we do not offer refunds for credits once they have been delivered. If you experience any technical issues or believe a purchase was made in error, please reach out to our support team within 24 hours of the transaction for assistance.
    </p>
  </div>

  <!-- Use of Credits -->
  <div class="mb-6">
    <h2 class="text-xl font-semibold text-gray-700">4. Use of Credits</h2>
    <p class="text-gray-600 mt-2">
      Credits purchased can be used immediately to access learning topics on our platform. They do not expire unless specified otherwise during promotional offers or specific terms for certain users.
    </p>
  </div>

  <!-- Errors and Disputes -->
  <div class="mb-6">
    <h2 class="text-xl font-semibold text-gray-700">5. Errors and Disputes</h2>
    <p class="text-gray-600 mt-2">
      In the event of any errors in the deliverance of credits, or if you experience any issues accessing your purchased credits, please notify our customer support within 48 hours of purchase to resolve the matter.
    </p>
  </div>

  <!-- Account Security -->
  <div>
    <h2 class="text-xl font-semibold text-gray-700">6. Account Security</h2>
    <p class="text-gray-600 mt-2">
      It is your responsibility to ensure that your account is secure and that no unauthorized parties have access to it. We are not responsible for any loss of credits due to unauthorized access to your account.
    </p>
  </div>
</div>


`;

  getContent(route: string): string {
    switch(route) {
      case 'privacy-policy':
        return this.privacyPolicy;
      case 'refund-policy':
        return this.refundPolicy;
      case 'terms-of-service':
          return this.termOfService; 
      case 'shipping-policy':
          return this.shippingPolicy;     
      default:
        return '<h1>404</h1><p>Route not found</p>';
    }
  }

  constructor() { }
}
