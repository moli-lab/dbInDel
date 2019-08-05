from django.db import models
from .Gene import Gene
class Article(models.Model):
    pmid = models.CharField(max_length=16, primary_key=True)
    cancer = models.CharField(max_length=8)
    genes = models.ManyToManyField(Gene)