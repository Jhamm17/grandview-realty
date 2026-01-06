import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const resumeFile = formData.get('resume') as File | null;

    // Validate required fields
    if (!name || !email || !phone || !jobTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process resume file if provided
    let resumeAttachment = null;
    if (resumeFile && resumeFile.size > 0) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload a PDF or Word document.' },
          { status: 400 }
        );
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (resumeFile.size > maxSize) {
        return NextResponse.json(
          { error: 'File size too large. Maximum size is 10MB.' },
          { status: 400 }
        );
      }

      // Convert file to buffer and then to base64 for Resend
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Content = buffer.toString('base64');
      
      resumeAttachment = {
        filename: resumeFile.name || 'resume.pdf',
        content: base64Content,
      };
    }

    // Create email content
    const emailSubject = `${jobTitle} Application - ${name}`;
    const resumeNote = resumeAttachment ? '\n\nResume attached.' : '';
    const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Position: ${jobTitle}${resumeNote}

I am interested in applying for the ${jobTitle} position at Grandview Realty.

Please contact me to discuss this opportunity further.

Thank you,
${name}
    `.trim();

    // Check if Resend API key is configured
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);
    
    if (!process.env.RESEND_API_KEY) {
      // Fallback to mailto link if API key is not configured
      // Note: mailto links cannot include file attachments, so we'll mention the resume in the body
      const mailtoBody = resumeAttachment 
        ? `${emailBody}\n\nNote: Resume file (${resumeAttachment.filename}) was provided but cannot be attached via mailto. Please request the resume from the applicant.`
        : emailBody;
      const mailtoLink = `mailto:lynda@grandviewsells.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(mailtoBody)}`;
      
      return NextResponse.json({
        success: true,
        message: 'Application ready to send',
        mailtoLink: mailtoLink,
        fallback: true
      });
    }

    // Prepare email options
    const emailOptions: any = {
      from: 'onboarding@resend.dev', // Use Resend's default domain until grandviewsells.com is verified
      to: ['lynda@grandviewsells.com'],
      subject: emailSubject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Job Application: ${jobTitle}</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Applicant Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Position:</strong> ${jobTitle}</p>
            ${resumeAttachment ? `<p><strong>Resume:</strong> ${resumeAttachment.filename} (attached)</p>` : ''}
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #1a365d; margin: 20px 0;">
            <h3 style="color: #1a365d; margin-top: 0;">Application Message:</h3>
            <p>I am interested in applying for the ${jobTitle} position at Grandview Realty.</p>
            <p>Please contact me to discuss this opportunity further.</p>
            <p><strong>Thank you,<br>${name}</strong></p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            This job application was submitted through the Grandview Realty careers page.
          </p>
        </div>
      `
    };

    // Add attachment if resume is provided
    if (resumeAttachment) {
      emailOptions.attachments = [resumeAttachment];
    }

    // Send email automatically using Resend
    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend email error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: `Failed to send application: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application sent successfully',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
