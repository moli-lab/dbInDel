from django.shortcuts import get_object_or_404
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.http import JsonResponse
from ..models import Indel
def biodalliance(request, indel_id):
    indel = get_object_or_404(Indel, pk=indel_id)
    return JsonResponse(dict(
        genome=indel.sample.genome,
        chrom=indel.chrom,
        start=indel.peak_start - 10 * 1000,
        end=indel.peak_end + 10 * 1000,
        bw=static('data/bw/{}.bw'.format(indel.sample.h3k27ac)),
        bed=static('data/bed/{}-{}-{}.bed'.format(indel.indel.upper(), indel.sample.h3k27ac, indel.no))
    ))