from django.db import models
class Gene(models.Model):
    symbol = models.CharField(max_length=32)
    full_name = models.TextField()
    ensembl = models.CharField(max_length=18)
    know_as = models.TextField()
    summary = models.TextField()
    priority = models.IntegerField()
    fusion = models.TextField()
    possible_tsg = models.TextField()
    tsg = models.TextField()
    possible_oncogene = models.TextField()
    oncogene = models.TextField()

    def __str__(self):
        return self.symbol

    def __repr__(self):
        return '<Gene id={}>'.format(self.id)