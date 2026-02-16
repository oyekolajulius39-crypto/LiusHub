# Lius Hub - Graphic Design Course Website

A complete, modern website for a weekend graphic design intensive course with payment integration, student portal, and admin features.

## 🎨 Features

- **Modern Purple Theme Design**: Distinctive, professional purple-themed UI with smooth animations
- **Skeleton Loading**: Professional loading experience with skeleton screens
- **Paystack Integration**: Secure payment processing for course enrollment
- **Google Sheets Integration**: Automatic student registration tracking
- **Protected Student Portal**: Access-controlled area for enrolled students
- **Mobile Responsive**: Fully optimized for all devices
- **Smooth Animations**: Fade-ins, scroll reveals, and interactive elements
- **Blog System**: Content management for updates and articles
- **Contact Forms**: Easy communication with potential students
- **FAQ Section**: Common questions and answers

## 📁 File Structure

```
liushub-website/
├── index.html           # Homepage
├── course.html          # Course details page
├── pricing.html         # Pricing and enrollment
├── blog.html            # Blog listing
├── contact.html         # Contact form
├── faq.html             # FAQ section
├── portal.html          # Student portal (protected)
├── styles.css           # Main stylesheet
├── course.css           # Course page styles
├── pricing.css          # Pricing page styles
├── script.js            # Main JavaScript
├── payment.js           # Paystack integration
├── logo-placeholder.svg # Logo placeholder
└── README.md            # This file
```

## 🚀 Setup Instructions

### 1. Paystack Configuration

1. Sign up for a Paystack account at https://paystack.com
2. Get your Public Key from the Paystack Dashboard
3. Open `payment.js` and replace `YOUR_PAYSTACK_PUBLIC_KEY` with your actual public key:

```javascript
const PAYSTACK_PUBLIC_KEY = 'pk_live_your_actual_key_here';
```

### 2. Google Sheets Integration

#### Step 1: Create Google Sheet
1. Go to Google Sheets and create a new spreadsheet
2. Name it "Lius Hub Students"
3. Add these column headers in row 1:
   - Timestamp
   - Full Name
   - Email
   - WhatsApp
   - Cohort
   - Package
   - Payment Reference
   - Amount

#### Step 2: Create Google Apps Script
1. In your Google Sheet, go to Extensions > Apps Script
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.email,
      data.whatsapp,
      data.cohort,
      data.packageType,
      data.paymentReference,
      data.amount
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### Step 3: Deploy Web App
1. Click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy" and copy the Web App URL
6. Open `payment.js` and replace the URL:

```javascript
const GOOGLE_SHEETS_WEB_APP_URL = 'your_copied_web_app_url_here';
```

### 3. Logo Upload

Replace `logo-placeholder.svg` with your actual logo file. The system supports:
- SVG (recommended for best quality)
- PNG with transparent background
- Maximum recommended size: 200x60px

### 4. Customize Content

Edit the HTML files to update:
- Course dates and pricing
- Instructor information
- Testimonials
- Contact information
- Social media links

## 🎯 How Payment Flow Works

1. **User clicks "Enroll Now"** on pricing page
2. **Modal opens** with registration form
3. **User fills** name, email, WhatsApp, cohort selection
4. **Paystack popup** opens for secure payment
5. **On success**:
   - Data saved to Google Sheets
   - Access token stored in browser
   - User redirected to Student Portal
6. **Student Portal** verifies payment before granting access

## 🔒 Portal Access Protection

The student portal checks for:
- `liushub-payment-verified` flag in localStorage
- Payment reference number
- Student email

This provides client-side protection. For production, implement server-side verification using Paystack's webhook system.

## 📱 Mobile Responsive

The website is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: <768px

## 🎨 Color Scheme

The design uses a purple theme with these primary colors:
- Primary Purple: #7C3AED
- Purple Dark: #5B21B6
- Purple Light: #A78BFA
- Accent Pink: #EC4899

## 🔧 Customization Tips

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-purple: #7C3AED;
    --purple-dark: #5B21B6;
    /* ... more variables */
}
```

### Update Pricing
Edit `payment.js`:
```javascript
const pricingConfig = {
    standard: {
        amount: 7500000, // in kobo
        name: 'Weekend Intensive'
    }
};
```

## 📊 Analytics (Optional)

To add Google Analytics:
1. Get your GA tracking ID
2. Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select branch (usually `main`) and root directory
4. Save and get your GitHub Pages URL

### Netlify (Recommended)
1. Sign up at netlify.com
2. Drag and drop your folder or connect GitHub repo
3. Site will be live immediately
4. Get free SSL certificate automatically

### Custom Domain
1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Update DNS settings to point to your hosting
3. Update absolute URLs in code if needed

## ⚙️ Environment Setup

For local development:
```bash
# Use any simple HTTP server
python -m http.server 8000
# OR
npx serve
# OR
npx live-server
```

Visit `http://localhost:8000`

## 🐛 Troubleshooting

**Paystack not loading?**
- Ensure public key is correct
- Check browser console for errors
- Verify Paystack script is loaded

**Google Sheets not receiving data?**
- Verify Web App URL is correct
- Check Apps Script deployment settings
- Ensure sheet permissions allow external access

**Portal not accessible?**
- Clear browser localStorage
- Complete a test payment
- Check browser console for errors

## 📝 TODO / Future Enhancements

- [ ] Add email confirmation system
- [ ] Implement server-side payment verification
- [ ] Add admin dashboard
- [ ] Create automated reminder emails
- [ ] Add video content to portal
- [ ] Implement progress tracking
- [ ] Add certificate generation
- [ ] Create mobile app version

## 📞 Support

For issues or questions:
- Email: support@liushub.com
- WhatsApp: +234 XXX XXX XXXX

## 📄 License

© 2024 Lius Hub. All rights reserved.

---

Built with ❤️ for aspiring graphic designers
