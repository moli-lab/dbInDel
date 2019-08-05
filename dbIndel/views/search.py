from django.db.models import Q
from django.db.models import F
from django.http import JsonResponse
from django.shortcuts import render
from ..models import Indel
from django.db.models import ExpressionWrapper
from decimal import Decimal
from django.db.models import FloatField

BIAS = ExpressionWrapper(F('ins_reads') * Decimal('1.0') / F('ref_reads'), output_field=FloatField())
ORDER = {
     '4': F('ins_reads'), '5': BIAS
}
# ORDER = {
#     '3': F('in_dbSNP'), '4': F('ref_reads'), '5': F('ins_reads'), '6': BIAS
# }
FILES = {'indel': 'indel.txt', 'bw': 'bw', 'enhancer': 'bed'}

sq=['indel__icontains', 'related_gene__symbol__icontains', 'annotation__icontains', 
'in_dbSNP__icontains', 'ins_reads__icontains', 'ref_reads__icontains', 
'tss_distance__icontains', 'nearest_refseq__icontains','tfs__icontains', 
'sample__name__icontains', 'sample__cancer_type__icontains',]

def search(request):
    search = request.GET.get('search')
    gene = request.GET.get('gene')
    chrom = request.GET.get('chrom')
    start = request.GET.get('region_start')
    end = request.GET.get('region_end')
    gene_genome = request.GET.get('gene_genome')
    region_genome = request.GET.get('region_genome')
    gene_cancer_type=request.GET.get('gene_cancer_type')
    region_cancer_type=request.GET.get('region_cancer_type')
    return render(request, "pages/search.html", dict(
        search=search, gene=gene, chrom=chrom, start=start, end=end,
        gene_genome=gene_genome, region_genome=region_genome,
        gene_cancer_type=gene_cancer_type,region_cancer_type=region_cancer_type
    ))

def search_table(request):
    draw = int(request.POST.get('draw'))
    indels = Indel.objects
    total = indels.count()
    search = request.GET.get('search')
    search_values=request.POST.get('search[value]')
    if search_values!='':
        indels = indels.filter(Q(tfs__icontains=search_values))
    searchs=[request.POST.get('columns[%d][search][value]'%(i,)) for i in range(11)]
    #searchs=[request.POST.get('columns[0][search][value]'), request.POST.get('columns[1][search][value]'),
    #request.POST.get('columns[2][search][value]'), request.POST.get('columns[3][search][value]'),
    #request.POST.get('columns[4][search][value]'), request.POST.get('columns[5][search][value]'),
    #request.POST.get('columns[6][search][value]'), request.POST.get('columns[7][search][value]'),
    #request.POST.get('columns[8][search][value]'), request.POST.get('columns[9][search][value]'),
    #request.POST.get('columns[10][search][value]')]
    q = Q()
    q.connector = 'AND'
    for index,value in enumerate(searchs):
        if value!='':
            if index==0:
                q_1=Q()
                q_1.connector = 'OR'
                if(value.isnumeric()):
                    q_1.children.extend([('start__icontains',value),('end__icontains',value)])
                else:
                    q_1.children.extend([('sequence__icontains',value),('chrom__icontains',value)])
                q.add(q_1,'AND')
            else:
                q.children.append((sq[index], value))

    indels = indels.filter(q)
    if search == 'gene':
        gene_genome = request.GET.get('gene_genome')
        indels = indels.filter(sample__genome=gene_genome)
        gene = request.GET.get('gene')
        if not gene:
            return JsonResponse(dict(draw=draw, recordsTotal=0, recordsFiltered=0, data=[], error='Please input gene!'))
        if gene.isnumeric():
            indels = indels.filter(Q(related_gene__id=int(gene)))
        else:
            indels = indels.filter(Q(related_gene__symbol=gene))
        gene_cancer_type=request.GET.get('gene_cancer_type')
        if gene_cancer_type and gene_cancer_type != 'All':
            indels=indels.filter(sample__cancer_type = gene_cancer_type)
    elif search == 'region':
        region_genome = request.GET.get('region_genome')
        cancer_type=request.GET.get('region_cancer_type')
        if cancer_type and cancer_type != 'All':
            indels=indels.filter(sample__cancer_type = cancer_type)
        indels = indels.filter(sample__genome=region_genome)
        chrom = request.GET.get('chrom')
        if not chrom:
            return JsonResponse(
                dict(draw=draw, recordsTotal=0, recordsFiltered=0, data=[], error='Please input chrome number!'))
        indels = indels.filter(chrom='chr{}'.format(chrom))
        start = request.GET.get('region_start')
        end = request.GET.get('region_end')
        if start:
            try:
                start = int(start)
            except ValueError:
                return JsonResponse(
                    dict(draw=draw, recordsTotal=0, recordsFiltered=0, data=[],
                         error='Please input as integer!'))
            indels = indels.filter(start__gt=int(start))
        if end:
            try:
                end = int(end)
            except ValueError:
                return JsonResponse(
                    dict(draw=draw, recordsTotal=0, recordsFiltered=0, data=[],
                         error='Please input as integer!'))
            indels = indels.filter(start__lt=int(end))
    else:
        return HttpResponseNotFound()
    filtered = indels.count()
    start = int(request.POST.get('start', 0))
    length = int(request.POST.get('length', 10))
    order = ORDER[request.POST.get('order[0][column]', '5')]
    if request.POST.get('order[0][dir]', 'desc') == 'desc':
        order = order.desc(nulls_first=True)
    else:
        order = order.asc(nulls_last=True)
    indels = indels.values(
        'id', 'related_gene__symbol', 'chrom', 'start', 'end', 'sequence', 'indel', 'sample__id',
        'annotation', 'in_dbSNP', 'ref_reads', 'ins_reads', 'tss_distance', 'nearest_refseq', 'tfs', 'sample__name', 'sample__cancer_type'
    ).order_by(order)[start: start + length]
    return JsonResponse(dict(draw=draw,
        recordsTotal=total, recordsFiltered=filtered, data=list(indels)
    ))