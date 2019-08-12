from django.db.models import F
from ..models import Sample
from django.db.models import Count
from django.http import JsonResponse

def biosample_plot(request):
    human = Sample.objects.filter(genome='hg19')
    human_count = human.count()
    human_biosample_type = human.values('biosample_type').annotate(
        count=Count('biosample_type')).values(name=F('biosample_type'), value=F('count'))
    murine = Sample.objects.filter(genome='mm10')
    murine_count = murine.count()
    murine_biosample_type = murine.values('biosample_type').annotate(
        count=Count('biosample_type')).values(name=F('biosample_type'), value=F('count'))
    return JsonResponse(dict(
        human_count=human_count,
        human_biosample_type=list(human_biosample_type),
        murine_count=murine_count,
        murine_biosample_type=list(murine_biosample_type)
    ))


def cancer_plot(request):
    sample_count = Sample.objects.count()
    cancer_type = Sample.objects.values('cancer_type').annotate(
        count=Count('cancer_type')).values(name=F('cancer_type'), value=F('count'))
    return JsonResponse(dict(sample_count=sample_count, cancer_type=list(cancer_type)))