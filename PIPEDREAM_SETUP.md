# Pipedream Workflow Setup Guide

## Quick Start - Create Your Webhook in 5 Minutes

### Step 1: Create Account
1. Go to https://pipedream.com
2. Sign up with GitHub/Google/Email (FREE)
3. Verify your email

### Step 2: Create New Workflow
1. Click **"New Workflow"** (big + button)
2. Select **"HTTP / Webhook Requests"**
3. Click **"Save and continue"**
4. **COPY YOUR WEBHOOK URL** (looks like: `https://eoxxx.m.pipedream.net`)

### Step 3: Configure Webhook to Accept POST Requests
Your webhook is now ready! It automatically accepts POST requests.

### Step 4: Add Processing Steps (Optional but Recommended)

#### Option A: Simple Console Logging
1. Click **"+"** to add new step
2. Select **"Run Node.js code"**
3. Paste this code:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    // Get the lead data from the webhook
    const lead = steps.trigger.event.body;
    
    console.log("New lead received:");
    console.log("University:", lead.university);
    console.log("Name:", lead.name);
    console.log("Email:", lead.email);
    console.log("Phone:", lead.phone);
    console.log("Program:", lead.program);
    console.log("Message:", lead.message);
    
    // Return formatted data
    return {
      success: true,
      leadId: `LEAD-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      data: lead
    };
  },
})
```

#### Option B: Send Email Notification
1. Click **"+"** to add new step
2. Search for **"Email"**
3. Select **"Email by Pipedream"**
4. Configure:
   - **To**: Your admissions email
   - **Subject**: `New Lead from {{steps.trigger.event.body.university}}`
   - **Text**: 
   ```
   New application received!
   
   University: {{steps.trigger.event.body.university}}
   Name: {{steps.trigger.event.body.name}}
   Email: {{steps.trigger.event.body.email}}
   Phone: {{steps.trigger.event.body.phone}}
   Program: {{steps.trigger.event.body.program}}
   Message: {{steps.trigger.event.body.message}}
   
   Submitted at: {{steps.trigger.event.body.timestamp}}
   ```

#### Option C: Save to Google Sheets
1. Click **"+"** to add new step
2. Search for **"Google Sheets"**
3. Select **"Add Single Row"**
4. Connect your Google account
5. Select your spreadsheet
6. Map fields:
   - Column A: `{{steps.trigger.event.body.timestamp}}`
   - Column B: `{{steps.trigger.event.body.university}}`
   - Column C: `{{steps.trigger.event.body.name}}`
   - Column D: `{{steps.trigger.event.body.email}}`
   - Column E: `{{steps.trigger.event.body.phone}}`
   - Column F: `{{steps.trigger.event.body.program}}`
   - Column G: `{{steps.trigger.event.body.message}}`

#### Option D: Send to Slack
1. Click **"+"** to add new step
2. Search for **"Slack"**
3. Select **"Send Message to Channel"**
4. Connect your Slack workspace
5. Configure:
   - **Channel**: Select admissions channel
   - **Message Text**:
   ```
   🎓 *New Lead Received!*
   
   *University:* {{steps.trigger.event.body.university}}
   *Name:* {{steps.trigger.event.body.name}}
   *Email:* {{steps.trigger.event.body.email}}
   *Phone:* {{steps.trigger.event.body.phone}}
   *Program:* {{steps.trigger.event.body.program}}
   *Message:* {{steps.trigger.event.body.message}}
   ```

### Step 5: Deploy Workflow
1. Click **"Deploy"** (top right)
2. Your workflow is now LIVE! ✅

### Step 6: Update Your Code
Replace the webhook URL in both JavaScript files:

**File: `mit-landing/script.js`** (Line ~18)
```javascript
const PIPEDREAM_WEBHOOK_URL = 'https://YOUR-WEBHOOK-URL.m.pipedream.net';
```

**File: `delhi-university-landing/script.js`** (Line ~18)
```javascript
const PIPEDREAM_WEBHOOK_URL = 'https://YOUR-WEBHOOK-URL.m.pipedream.net';
```

---

## Testing Your Webhook

### Method 1: Test from Landing Page
1. Open `mit-landing/index.html` or `delhi-university-landing/index.html`
2. Click "Apply Now" button
3. Fill out the form
4. Submit
5. Check Pipedream dashboard for received data

### Method 2: Test with curl
```bash
curl -X POST https://YOUR-WEBHOOK-URL.m.pipedream.net \
  -H "Content-Type: application/json" \
  -d '{
    "university": "MIT",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "program": "Engineering",
    "message": "This is a test",
    "timestamp": "2025-11-13T10:30:00.000Z",
    "source": "MIT Landing Page"
  }'
```

### Method 3: Test from Pipedream
1. Go to your workflow
2. Click on HTTP trigger step
3. Click **"Generate test event"**
4. Paste sample JSON:
```json
{
  "university": "Delhi University",
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "+91-9876543210",
  "program": "Undergraduate",
  "message": "Interested in B.Sc. program",
  "timestamp": "2025-11-13T10:30:00.000Z",
  "source": "Delhi University Landing Page"
}
```
5. Click **"Send test event"**
6. Check if all steps execute successfully

---

## Sample Workflow Templates

### Template 1: Basic Lead Capture
**Purpose**: Log leads and send email notification

**Steps**:
1. HTTP Webhook Trigger
2. Node.js - Process Data
3. Email - Send Notification

### Template 2: CRM Integration
**Purpose**: Save leads to Google Sheets + Notify via Slack

**Steps**:
1. HTTP Webhook Trigger
2. Node.js - Validate & Format Data
3. Google Sheets - Add Row
4. Slack - Send Notification

### Template 3: Full Automation
**Purpose**: Complete lead management system

**Steps**:
1. HTTP Webhook Trigger
2. Node.js - Validate & Enrich Data
3. Google Sheets - Add Row
4. Email - Send to Admissions Team
5. Slack - Post to Channel
6. Email - Send Auto-reply to Applicant

---

## Advanced: Auto-Reply to Applicants

Add this step to send confirmation email to the applicant:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const lead = steps.trigger.event.body;
    
    // Use SendGrid, Mailgun, or Email by Pipedream
    await $.send.email({
      to: lead.email,
      subject: `Application Received - ${lead.university}`,
      text: `
Dear ${lead.name},

Thank you for your interest in ${lead.university}!

We have received your application for the ${lead.program} program.

Our admissions team will review your application and contact you within 3-5 business days.

Application Details:
- Program: ${lead.program}
- Submitted: ${new Date().toLocaleDateString()}
- Reference ID: LEAD-${Date.now()}

If you have any questions, please don't hesitate to reach out.

Best regards,
${lead.university} Admissions Team
      `
    });
    
    return { emailSent: true };
  },
})
```

---

## Troubleshooting

### Issue: Webhook not receiving data
**Solution**: 
- Check webhook URL is correct
- Ensure form is using POST method
- Check browser console for errors

### Issue: CORS errors
**Solution**:
- Pipedream webhooks support CORS by default
- No additional configuration needed

### Issue: Data not formatted correctly
**Solution**:
- Check the payload structure in Pipedream logs
- Update your processing code to match the structure

### Issue: Workflow not triggering
**Solution**:
- Ensure workflow is deployed (check top-right corner)
- Click "Deploy" if you see unsaved changes

---

## Data Structure

The form sends this JSON structure to your Pipedream webhook:

```json
{
  "university": "MIT" | "Delhi University",
  "name": "string",
  "email": "string (validated)",
  "phone": "string",
  "program": "string (from dropdown)",
  "message": "string (optional)",
  "timestamp": "ISO 8601 datetime",
  "source": "MIT Landing Page" | "Delhi University Landing Page"
}
```

---

## Best Practices

1. **Always validate data** in your Node.js step
2. **Log everything** for debugging
3. **Send confirmations** to applicants
4. **Store data** in a database or spreadsheet
5. **Notify your team** via email/Slack
6. **Monitor workflow** regularly in Pipedream dashboard

---

## Free Tier Limits

Pipedream free tier includes:
- ✅ Unlimited workflows
- ✅ 10,000 invocations per day
- ✅ 300 seconds execution time per invocation
- ✅ 512MB memory per workflow
- ✅ All built-in integrations

**This is more than enough for your landing pages!**

---

## Next Steps

1. ✅ Create your Pipedream workflow
2. ✅ Copy your webhook URL
3. ✅ Update the JavaScript files with your URL
4. ✅ Test form submission
5. ✅ Add email/Slack notifications
6. ✅ Optional: Add Google Sheets integration
7. ✅ Deploy your landing pages

---

**Need Help?**
- Pipedream Docs: https://pipedream.com/docs
- Community: https://pipedream.com/community
- Support: support@pipedream.com

---

**Status**: 🟢 Ready to use!
