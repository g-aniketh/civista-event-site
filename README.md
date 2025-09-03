# Civista Club Event Registration Site

A modern, responsive event registration website built with Next.js, TypeScript, and Tailwind CSS. Features Google Sheets integration for data collection and comprehensive form validation.

## Features

- 🎯 **Event Registration Form** with Google Sheets integration
- ✅ **Comprehensive Form Validation** with real-time error messages
- 📱 **Responsive Design** optimized for all devices
- 🎨 **Modern UI/UX** with smooth animations and transitions
- 📅 **Event Schedule** and detailed information
- 👥 **Team Information** with contact details
- 💳 **Payment Instructions** with QR code placeholder
- 🌙 **Dark/Light Mode** support

## Events

The site is configured for the following events on **15th September 2025**:

1. **Match the Logo** - ₹120 for a team of 3
2. **Tower Trouble** - ₹150 for a team of 3  
3. **Science Sprint Puzzle** - ₹100 for a team of 2
4. **Geo-Capital Challenge** - ₹50 for single participant

## Google Sheets Integration Setup

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add the following columns in the first row:
   - `Timestamp`
   - `Name`
   - `Roll Number`
   - `Department`
   - `Email`
   - `Event`
   - `College`

### 2. Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Replace the default code with:

```javascript
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = e.parameter;
    
    // Add timestamp
    const timestamp = new Date();
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.name || '',
      data.roll || '',
      data.dept || '',
      data.email || '',
      data.event || '',
      data.college || ''
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Choose **Web app** as type
3. Set **Execute as**: `Me`
4. Set **Who has access**: `Anyone`
5. Click **Deploy**
6. Copy the **Web app URL**

### 4. Update Configuration

1. Open `lib/config.ts`
2. Replace the `googleSheetsUrl` with your deployed web app URL:

```typescript
export const config = {
  googleSheetsUrl: "YOUR_DEPLOYED_WEB_APP_URL_HERE",
  // ... other config
}
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd civista-event-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

All site configuration is centralized in `lib/config.ts`:

- **Google Sheets URL**: Update with your deployed web app URL
- **Event Details**: Modify event information, prices, and team sizes
- **Team Members**: Update team information and contact details
- **Event Date**: Change the event date
- **Contact Information**: Update email and organization details

## Form Validation

The registration form includes comprehensive validation:

- **Name**: Letters and spaces only, minimum 2 characters
- **Roll Number**: Numbers only, 1-10 digits
- **Department**: 2-4 letters (e.g., CSE, ECE, ME)
- **Email**: Valid email format, college email or Gmail preferred
- **Event**: Must select an event
- **College**: Minimum 3 characters

## Customization

### Adding New Events

1. Update `lib/config.ts`:
```typescript
events: [
  // ... existing events
  {
    id: "new-event",
    name: "New Event Name",
    price: 200,
    teamSize: 4,
    description: "Event description",
    time: "2:00 PM - 4:00 PM",
    venue: "New Venue"
  }
]
```

### Modifying Team Members

1. Update `lib/config.ts`:
```typescript
teamMembers: [
  // ... existing members
  {
    name: "New Member",
    role: "New Role",
    contact: "+91 12345 67890"
  }
]
```

### Styling Changes

- **Colors**: Update Tailwind CSS classes in components
- **Layout**: Modify component structure and spacing
- **Animations**: Adjust Framer Motion animations

## File Structure

```
civista-event-site/
├── app/                    # Next.js app directory
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── registration-form.tsx  # Registration form
│   ├── payment-qr.tsx        # Payment QR component
│   ├── section.tsx           # Section wrapper
│   ├── sidebar-nav.tsx       # Navigation sidebar
│   └── ui/                   # UI components
├── lib/                  # Utility functions
│   ├── config.ts         # Site configuration
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Google Apps Script** - Backend integration

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Troubleshooting

### Google Sheets Integration Issues

1. **Check Web App URL**: Ensure the URL in `config.ts` is correct
2. **Verify Permissions**: Make sure the web app is deployed with "Anyone" access
3. **Check Apps Script Logs**: View execution logs in Google Apps Script
4. **Test with Postman**: Verify the web app responds to GET requests

### Form Submission Issues

1. **Check Browser Console**: Look for JavaScript errors
2. **Verify Network Tab**: Check if the request is being sent
3. **Test Validation**: Ensure all required fields are filled correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Note**: Remember to replace the Google Sheets URL in `lib/config.ts` with your actual deployed web app URL before using the registration form.
