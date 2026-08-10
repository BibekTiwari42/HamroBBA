"""
Data migration: OTP-only accounts.

Authentication is OTP + Google now — the old email/password signup has been
removed. Stored password hashes from that era serve no purpose, so they are
cleared for every non-staff user: no residual credential can ever be used (or
leaked from a stolen database) to impersonate an account.

Staff / superusers keep their passwords so they can still log into the Django
admin (``EmailOrUsernameModelBackend`` + ``ModelBackend`` stay configured).
"""

from django.db import migrations


def clear_nonstaff_passwords(apps, schema_editor):
    """Set ``password=''`` on every non-staff user that still has one."""
    User = apps.get_model("auth", "User")
    cleared = User.objects.filter(is_staff=False).exclude(password="").update(password="")
    if cleared:
        print(f"accounts: cleared stored passwords for {cleared} non-staff user(s)")


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_onetimepassword"),
    ]

    operations = [
        migrations.RunPython(clear_nonstaff_passwords, migrations.RunPython.noop),
    ]