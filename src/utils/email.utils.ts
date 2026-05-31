import { Request } from "express";
import mongoose from "mongoose";

export const generateLoginSuccessEmailHtml = (
  req: Request,
  user: {
    full_name: string;
    email: string;
    _id: mongoose.Types.ObjectId;
  }
) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Login Successful</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f0f9ff; font-family:Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">

              <table width="600" cellpadding="0" cellspacing="0" 
                style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

                <!-- Header -->
                <tr>
                  <td 
                    style="background:linear-gradient(135deg, #0ea5e9, #38bdf8); padding:30px; text-align:center;">
                    <h1 style="color:white; margin:0; font-size:28px;">
                      Login Successful
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px; color:#0f172a;">

                    <h2 style="margin-top:0; color:#0284c7;">
                      Hello ${user.full_name},
                    </h2>

                    <p style="font-size:16px; line-height:1.7; color:#334155;">
                      Your account has been successfully logged in.
                    </p>

                    <table cellpadding="0" cellspacing="0" width="100%" 
                      style="margin:25px 0; background:#e0f2fe; border-radius:10px; padding:20px;">
                      
                      <tr>
                        <td style="padding:8px 0; color:#0369a1;">
                          <strong>Email:</strong> ${user.email}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:8px 0; color:#0369a1;">
                          <strong>User ID:</strong> ${user._id}
                        </td>
                      </tr>
                    </table>

                    <p style="font-size:15px; line-height:1.6; color:#475569;">
                      If this login was not made by you, please secure your account immediately.
                    </p>

                    <div style="text-align:center; margin-top:30px;">
                      <a 
                        href="${req.protocol}://${req.get("host")}"
                        style="
                          background:#0ea5e9;
                          color:white;
                          text-decoration:none;
                          padding:14px 28px;
                          border-radius:8px;
                          display:inline-block;
                          font-weight:bold;
                        "
                      >
                        Visit Website
                      </a>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td 
                    style="background:#e0f2fe; padding:20px; text-align:center; color:#0369a1; font-size:14px;">
                    © 2026 Your Company. All rights reserved.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;

  return html;
};