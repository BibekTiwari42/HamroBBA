"""
Email service for the accounts app.

All outgoing transactional email is sent through this module. The functions
build the context, render the HTML template and hand off to Django's
``send_mail``. The interface is deliberately Celery-friendly — to make
sending asynchronous later, wrap each call in a Celery task without changing
any call site::

    @shared_task
    def send_otp_email_task(email, code):
        ...

and replace the direct call in ``services.py`` with
``send_otp_email_task.delay(email, code)``.
"""

from __future__ import annotations

import logging

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

logger = logging.getLogger("accounts")


def _send(*, subject: str, html_template: str, context: dict, recipient_list) -> bool:
    """Render ``html_template`` and dispatch the email.

    Returns ``True`` on success. Failures are logged but never raised so a
    broken mail server can never take down an auth flow — the code remains
    valid and the user can simply request another one.
    """
    context.setdefault("frontend_url", settings.FRONTEND_URL)

    try:
        html_body = render_to_string(html_template, context)
    except Exception:  # pragma: no cover - template error path
        logger.exception("accounts.emails: failed to render template '%s'", html_template)
        return False

    try:
        send_mail(
            subject=subject,
            message="",  # plain-text fallback; HTML is the primary body
            html_message=html_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=list(recipient_list),
            fail_silently=False,
        )
        return True
    except Exception:  # pragma: no cover - network / SMTP error path
        logger.exception(
            "accounts.emails: failed to send '%s' to %s",
            subject,
            recipient_list,
        )
        return False


def send_otp_email(email: str, code: str) -> bool:
    """Email the one-time login/signup code to ``email``."""
    return _send(
        subject="Your HamroBBA login code",
        html_template="emails/otp_email.html",
        context={"email": email, "otp_code": code},
        recipient_list=[email],
    )