from django.views.decorators.cache import cache_page
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from ..models import Sample

@cache_page(None)
def sample(request, sample_id):
    sample = get_object_or_404(Sample, pk=sample_id)
    return render(request, 'pages/sample.html', dict(sample=sample))


def sample_table(request, sample_id):
    sample = get_object_or_404(Sample, pk=sample_id)
    indels = sample.indel_set.values(
        'id', 'related_gene__symbol', 'chrom', 'start', 'end', 'sequence', 'indel', 'tfs',
        'annotation', 'in_dbSNP', 'ref_reads', 'ins_reads', 'tss_distance', 'nearest_refseq'
    )
    return JsonResponse(dict(data=list(indels)))