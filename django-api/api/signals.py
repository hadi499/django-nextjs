from django.db.models.signals import pre_delete, post_delete
from .models import Post
from django.dispatch import receiver


# @receiver(pre_delete, sender=Post)
# def pre_delete_profile(sender, **kwargs):
#     print("you delete something")


# @receiver(post_delete, sender=(Post))
# def delete_profile(sender, **kwargs):
#     print("you delete post")
