from django.contrib import admin

# Register your models here.
from dbIndel.models import Indel
from dbIndel.models import Gene
from dbIndel.models import Sample

# Register your models here.
admin.site.register([Indel, Sample, Gene])
