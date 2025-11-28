El-Onj Kiddies Website - Troubleshooting

If you're getting a "Not Found" error when accessing http://localhost/El-Onj/, try these solutions:

1. Make sure Apache is running in XAMPP Control Panel

2. Try accessing the site directly: http://localhost/El-Onj/index.html

3. Verify the exact folder name case sensitivity:
   - The folder name is "El-Onj" with capital letters
   - Try accessing: http://localhost/El-Onj/
   - Don't use lowercase: http://localhost/el-onj/ (this won't work)

4. If that doesn't work, you may need to add directory permissions to Apache configuration:

   Add the following to C:\xampp\apache\conf\httpd.conf:
   
   <Directory "C:/xampp/htdocs/El-Onj">
       Options Indexes FollowSymLinks Includes ExecCGI
       AllowOverride All
       Require all granted
   </Directory>

5. After making changes to Apache configuration, restart the Apache service

6. Alternative solution - Place files directly in C:\xampp\htdocs\ to access them at http://localhost/

Project Structure:
- index.html: Main homepage
- products.html: Product listings
- cart.html: Shopping cart
- checkout.html: Checkout process
- contact.html: Contact page
- login.html: Customer login
- register.html: Customer registration
- admin-login.html: Admin login
- admin.html: Admin dashboard
- admin-contacts.html: Admin contacts management
- post-purchase-contact.html: Post-purchase contact page
- script.js: JavaScript functionality
- styles.css: Website styling

If none of these solutions work, please check:
- That Apache is properly installed and running
- That the firewall isn't blocking Apache
- That no other services are using port 80
- The Windows hosts file (C:\Windows\System32\drivers\etc\hosts) for any conflicting entries

IMPORTANT FILES FOR TROUBLESHOOTING:
- TROUBLESHOOTING-GUIDE.txt: Detailed step-by-step solutions
- test.html: Simple HTML test file
- info.php: PHP information file
- .htaccess: Directory access configuration