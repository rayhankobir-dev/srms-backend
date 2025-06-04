const resetPasswordEmail = ({ firstName, resetPasswordLink }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <link rel="preload" as="image" href="${process.env.APP_LOGO_URL}" />
    <title>Reset Your Password</title>
  </head>
  <body style="background-color:#f6f9fc;padding:10px 0;">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;" data-skip-in-text="true">
      ${process.env.APP_NAME} reset your password
    </div>
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px;">
      <tr>
        <td>
          <img
            src="${process.env.APP_LOGO_URL}"
            alt="${process.env.APP_NAME}"
            width="40"
            height="33"
            style="display:block;border:none;"
          />
          <p style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#404040;margin:16px 0;">
            Hi ${firstName},
          </p>
          <p style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#404040;margin:16px 0;">
            Someone recently requested a password change for your ${process.env.APP_NAME} account. If this was you, you can set a new password here:
          </p>
          <a
            href="${resetPasswordLink}"
            style="display:inline-block;width:210px;padding:14px 7px;background-color:#007ee6;border-radius:4px;color:#ffffff;text-align:center;text-decoration:none;font-size:15px;font-family:'Open Sans',Helvetica,Arial,sans-serif;"
            target="_blank"
          >
            Reset password
          </a>
          <p style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#404040;margin:16px 0;">
            If you didn’t request this, you can safely ignore this email.
          </p>
          <p style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#404040;margin:16px 0;">
            To keep your account secure, don’t forward this email to anyone.
            Visit our <a href="https://www.dropbox.com" target="_blank" style="color:#067df7;text-decoration:underline;">Help Center</a> for more security tips.
          </p>
          <p style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#404040;margin:16px 0;">
            Happy ${process.env.APP_NAME}ing!
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

module.exports = resetPasswordEmail;
